# План миграции CMS: Hygraph → Sanity

**Проект:** yashil-energiya.uz — Next.js 16 App Router, React 19, TS, next-intl (en/ru/uz), Vercel.
**Ветка:** `feature/sanity-migration`. Все работы ведутся в ней; `main` и прод не затрагиваются до cutover.
**Главная цель:** снять лимит бесплатного Hygraph в 2 локали и завести uz-контент в CMS. Сейчас CMS-контент есть только на en/ru (`cmsContentLocales` в `src/lib/seo.ts`), а uz-страницы новостей, статей, СЭС и вакансий редиректят на en.

> **Hygraph остаётся рабочей (боевой) CMS** до завершения переноса, тестирования на preview и отдельного решения о переключении прода. Миграция читает Hygraph **только на чтение**: модели и контент Hygraph не меняются (AGENTS.md §9).

---

## Статус

| Этап | Статус |
|---|---|
| 0. Инвентаризация реального контента | ✅ готово (`extract.mjs`, `inventory.mjs`) |
| 1. Прототип конвертера RichText → Portable Text | ✅ готово, прогнан на всём контенте |
| 2. Sanity-проект, датасеты, Studio | ⏳ нужны решения владельца (см. «Открытые решения») |
| 3. Схемы Sanity + TypeGen | — |
| 4. Трансформ документов в NDJSON + импорт ассетов | — |
| 5. Сервисы на GROQ | — |
| 6. Рендерер Portable Text | — |
| 7. Вебхук ревалидации | — |
| 8. SEO / sitemap / ассистент / CSP | — |
| 9. uz-контент и снятие uz-заглушек | — |
| 10. Preview-QA → cutover прода | — |

---

## Ключевые решения

| Вопрос | Решение | Обоснование |
|---|---|---|
| i18n | **Document-level** (`@sanity/document-internationalization`): отдельный документ на каждую локаль | Фронт рендерит одну локаль на роут; добавление uz не меняет схему; GROQ остаётся простым (`language == $locale`). Field-level раздул бы каждое поле в массив по локалям |
| Запросы | **GROQ** (`@sanity/client` / `next-sanity`), а не GraphQL API Sanity | Не нужен `sanity graphql deploy` при каждом изменении схемы, есть произвольные проекции и TypeGen. Форму запросов всё равно пришлось бы переписывать (`locales:[]` и `where` в Sanity нет) |
| RichText | Hygraph AST → **Portable Text** структурным маппингом; рендер через `@portabletext/react` | Формат Hygraph — Slate-подобный JSON, а не HTML/Markdown |
| Ассеты | Перезалить в `cdn.sanity.io` из **оригиналов** | Убрать зависимость от `graphassets.com`; `width`/`height` берутся из метаданных ассета |
| URL | **Не меняются** (AGENTS.md §3.2, §3.6) | slug'и и id из Hygraph сохраняются — см. «ID и роуты» |
| Rollback | **Vercel Instant Rollback** на предыдущий деплой + Hygraph в режиме read-only на время окна отката | Hygraph не меняется, поэтому старый деплой работает сразу. Двойной провайдер-слой в коде не нужен |

---

## 1. Инвентаризация (реальные данные, снапшот 2026-09-23)

Получено через `scripts/sanity-migration/extract.mjs` + `inventory.mjs`.

| Модель Hygraph | Тип Sanity | Локализована | Записей (en / ru) | Роут |
|---|---|---|---|---|
| `Article` | `article` | да | 7 / 7 | `/{locale}/articles/{slug}` |
| `New` (API `news`) | `news` | да | 71 / 71 | `/{locale}/news/{slug}` |
| `Plant` | `plant` | да | 20 / 20 | `/{locale}/plants/{id}` — **id записи Hygraph** |
| `Vacancy` | `vacancy` | да | 2 / 2 | `/{locale}/vacancies/{id}` — **id** |
| `Manager` | `manager` | да | 14 / 14 | используется на `/ceo` |
| `EvCharge` | `evCharge` | нет | 15 | карта |
| `Mhp` | `mhp` | нет | 18 | карта |
| `PlantStatus` | `plantStatus` | нет | 14 | карта |
| компонент `Seo` | объект `seo` | да | — | встроен в article/news |
| `DemoComponent` | — | — | — | **не переносится** (сайт не использует) |

**Итого: 275 записей-локалей** (114 локализованных сущностей × 2 + 47 нелокализованных). Цифра «513», которую показывает Hygraph, включает ассеты. С запасом влезает в бесплатный тариф Sanity (10 000 документов).

**Находки, влияющие на план:**

1. **Покрытие переводами 100%**, дублей slug'ов нет.
2. **Slug'и одинаковы в en и ru у всех 78 статей и новостей**, то есть фактически не локализованы. Текущий SEO-слой (`languageAlternates`) на это и рассчитан: путь один и тот же во всех локалях. uz-документы получат тот же slug.
3. Узлы RichText: `paragraph` 1389, `image` 376 (206 уникальных), `list-item` 563 (вложенных списков нет), `link` 72, `heading-three` 40, `block-quote` 14, `heading-four` 6, `table` 4. Метки: `bold`, `italic`, `underline`, `superscript`.
4. **`heading-four` сейчас не отображается на сайте**: в `ThePageContent` для него срабатывает `default → null`. В статье «what-is-the-difference-between-renewable-and-green-energy» (en+ru) скрыты подзаголовки «Renewable Energy», «Green Energy», «Conclusion:».
5. **4 битые ссылки на проде**: в ru-версии статьи `when-does-a-solar-plant-pay-off` ссылки сохранены без `https://` и открываются как относительные (404). Конвертер их исправляет и помечает в отчёте.
6. **alt у картинок**: у 146 из 153 ассетов нет `altText`; у 312 из 376 картинок в RichText тоже нет alt. `TheImageModal` берёт `altText ?? title` (коммит `4cc0159`), поэтому у картинок без `altText` в `alt` по-прежнему попадает **имя файла** («en.png»). В Sanity переносим `altText`, а без него `alt` остаётся пустым. Недостающие alt заполняют редакторы.
7. Ассеты: 153 сущности на 206 МБ, все на `us-west-2.graphassets.com`. Картинки в RichText хранятся как уже трансформированные URL (`output=format:webp/resize=…/<handle>`), а импортировать нужно оригинал `…/<env>/<handle>`.
8. `region` и `condition` — enum'ы Hygraph; их значения снимаются в `enums.json` и переносятся в `options.list`.
9. В `Plant` все показатели (`power`, `production`, `coal` и т. д.) — строки. На этапе стабилизации переносим как есть, нормализацию в числа делаем отдельной задачей.
10. **Бесплатный Hygraph ограничивает частоту запросов (429), и прод делит этот лимит.** Экстрактор работает с паузами и backoff; массовые выгрузки лучше запускать вне пиковых часов.

---

## 2. Схемы Sanity

Типы описываются через `defineType` / `defineField` / `defineArrayMember`.

**Документы**
- Локализованные: `article`, `news`, `plant`, `vacancy`, `manager` — поле `language` (управляет плагин document-internationalization).
- Нелокализованные: `evCharge`, `mhp`, `plantStatus` — без `language`. У `evCharge` и `mhp` одинаковая форма → общий набор полей, но два типа (разные запросы и теги кэша).

**Объекты**
- `seo` — `metaTitle`, `metaDescription`, `ogImage`, `noIndex`, `canonicalUrl` (встроенный объект: это метаданные конкретной страницы, ссылка не нужна).
- `imageBlock` — картинка в теле: `image` + `alt` (+ `caption`), `hotspot: true`.
- `table` → `rows[]: tableRow { isHeader: boolean, cells[]: tableCell { content: Portable Text } }`. В PT нет нативной таблицы. Признак заголовка хранится явно, вместо эвристики «жирная первая строка» в рендере.
- Поле Portable Text (`content` / `description`): стили `normal`, `h2`, `h3`, `h4`, `blockquote`; списки `bullet`, `number`; декораторы `strong`, `em`, `underline`, `sup`; аннотация `link { href, openInNewTab }`; блоки `imageBlock`, `table`.

**Уровни заголовков.** Сейчас `heading-three` из CMS рендерится как `<h2>` (единственный `<h1>` — заголовок страницы). Правило конвертации: `heading-N → h(N-1)`, не выше `h2`. Итого `heading-three → h2`, `heading-four → h3`.

**Картинки.** Поля `fileName` / `width` / `height` из Hygraph больше не нужны: они берутся из `asset->metadata.dimensions` и `asset->originalFilename`.

**Уникальность slug.** Стандартный `isUnique` проверяет все документы типа, а en/ru/uz-версии имеют одинаковый slug (находка 2). Нужна своя проверка уникальности **в рамках языка**.

### ID и роуты (URL не меняются)

- Детерминированный `_id`: `<type>-<hygraphId>-<locale>` для локализованных типов, `<type>-<hygraphId>` для нелокализованных. **Точки в `_id` не используем**: в Sanity id с точкой считается «путём» и недоступен без авторизации (так устроены `drafts.*`).
- Поле `hygraphId` (только чтение) на всех документах: используется для роутов по id и для дебага/QA.
- `news` / `article`: роут по `slug.current` + `language`.
- `plant` / `vacancy`: роут `/{locale}/plants/{id}` резолвится запросом `*[_type == "plant" && hygraphId == $id && language == $locale][0]`, так что старые URL продолжают работать. Для новых записей, созданных уже в Sanity, `hygraphId` получает сгенерированное начальное значение. **Проверить на этапе схем**, что при создании перевода плагин переносит это значение в новый документ. Если нет — выставлять его через `initialValue` или своё действие над документом, чтобы все языковые версии имели общий id в URL.
- Документы связей переводов (`translation.metadata`): детерминированный `_id` `translations-<type>-<hygraphId>`. Точную форму документа сверить с установленной версией плагина.

---

## 3. RichText → Portable Text (прототип готов)

Код: `scripts/sanity-migration/lib/richtext-to-portable-text.mjs`, тесты: `richtext-to-portable-text.test.mjs`.

| Hygraph | Portable Text |
|---|---|
| `paragraph` | блок `normal` (пустые отбрасываются, как и в текущем рендере) |
| `heading-three` / `heading-four` | `h2` / `h3` |
| `block-quote` | блок `blockquote` |
| `bulleted-list` / `numbered-list` → `list-item` → `list-item-child` (→ `paragraph`) | блоки с `listItem: bullet \| number`, `level` |
| флаги листа `bold` / `italic` / `underline` / `superscript` | декораторы `strong` / `em` / `underline` / `sup` |
| `link` (`href`, `openInNewTab`) | `markDefs: link` |
| `image` | `imageBlock`, ассет по оригинальному URL, `alt` из `altText` |
| `table` (`table_head` / `table_body` / `table_row` / `table_cell`) | `table` с явным `isHeader` |
| неизвестный узел | текст сохраняется как абзац + issue в отчёте (ничего не теряется молча) |

**Результат прогона по всему контенту** (`convert-richtext.mjs`):
- 160 RichText-полей → 2087 блоков;
- **0 ошибок структурной валидации, 0 потерь текста** (сравнивается весь видимый текст источника и результата);
- результат **детерминирован**: повторный прогон даёт побайтно идентичный вывод, поэтому импорт можно безопасно перезапускать;
- отчёт: 4 исправленные ссылки без протокола, 312 картинок без alt, 3 заголовка таблиц выведены автоматически.

**На ревью редактору.** Во второй таблице en-версии статьи `when-does-a-solar-plant-pay-off` нет строки-заголовка, которая есть в ru («Показатель | Значение»). Поэтому заголовком становится жирная первая строка данных «Location | Navoi Region, Karmana District». На проде сейчас то же самое (такая же эвристика в `TheTable`). В Sanity это будет переключатель `isHeader`.

### Рендерер (этап 6)

`ThePageContent` + `TheParagraph` + `TheList` + `TheTable` + `renderRichLeaves` заменяются на `<PortableText>` с сериализаторами:
- `marks.link` — `target="_blank" rel="noreferrer"` (как сейчас), `sup`, `underline`;
- `block`: `h2`, `h3`, `blockquote`, `normal`; `list`: bullet / number;
- `types.imageBlock` → существующий `TheImageModal` (галерея = все `imageBlock` тела), `alt` из `alt`, а не из имени файла;
- `types.table` → адаптированный `TheTable` (логика закреплённой колонки `--col1-width` сохраняется, заголовок берётся из `isHeader`).

Плоский текст для SEO-описаний и ассистента (`richTextToPlainText` в `src/lib/seo.ts` и `src/lib/assistant/knowledge.ts`) — небольшая собственная функция обхода PT, без новой зависимости (AGENTS.md §6).

---

## 4. Сервисы: GraphQL → GROQ

- `lib/graphql-client.ts` → новый клиент Sanity в `lib/` с **той же сигнатурой** `fetchData(query, params, { revalidate, tags })`. Семантика `next: { revalidate, tags }` / `cache: "no-store"` сохраняется.
- 8 сервисов в `services/` переписываются на GROQ (`defineQuery` → TypeGen), интерфейсы ответов по возможности сохраняются, чтобы не трогать страницы. Примеры:
  - статья: `*[_type == "article" && slug.current == $slug && language == $locale][0]{ ..., cover{ asset->{ url, metadata{ dimensions } } } }`
  - новости с пагинацией и счётчиком: `{ "news": *[_type == "news" && language == $locale] | order(date desc) [$start...$end]{...}, "total": count(*[_type == "news" && language == $locale]) }`
  - СЭС и вакансия по id: `*[_type == "plant" && hygraphId == $id && language == $locale][0]`
  - карточные типы (`evCharge`, `mhp`, `plantStatus`): без `language`, `revalidate: false` как сейчас.
- После изменения схемы или запросов: `sanity schema extract` + `sanity typegen generate`.

---

## 5. Ассеты и конфигурация

- Импорт: `_sanityAsset: "image@<оригинальный URL>"` для обложек, `pictures`, `photo`, `ogImage` и картинок в теле; `file@…` для `vacancy.attachments`. Перед импортом проверить, что каждый файл доступен и не нулевого размера.
- `next.config.js`: `images.remotePatterns` → `cdn.sanity.io`. Текущие настройки оптимизации (`formats: ["image/webp"]`, кэш 30 дней, `deviceSizes`, `imageSizes`, `qualities: [75]`) сохраняются. CSP `img-src` — убрать `us-west-2.graphassets.com`, добавить `https://cdn.sanity.io`; CSP `connect-src` — убрать `*.hygraph.com`, `*.graphcms.com`, `us-west-2.graphassets.com`, добавить `https://<projectId>.api.sanity.io` и `https://<projectId>.apicdn.sanity.io`.
- `src/lib/seo.ts` → `optimizedOgImagePath`: проверку хоста `us-west-2.graphassets.com` заменить на `cdn.sanity.io`.

## 6. Вебхук ревалидации

- Sanity webhook (GROQ-проекция `{ _type, "slug": slug.current, _id }`) → существующий `/api/revalidate`.
- `lib/cache-tags.ts`: ключи сейчас соответствуют `__typename` Hygraph (3 live-типа). Переходим на `_type` Sanity и расширяем на все 8 типов.
- Аутентификация: вместо Bearer + `timingSafeEqual` проверяется подпись Sanity (`sanity-webhook-signature`). Логика `revalidateTag(tag, { expire: 0 })` остаётся.
- На время массового импорта вебхуки отключаются.
- Для детальных страниц `news` / `articles` / `plants` / `vacancies` в `next.config.js` заданы CDN-заголовки `s-maxage=300, stale-while-revalidate=600`. На preview проверить, через сколько правка в Sanity видна на сайте: `revalidateTag` сбрасывает кэш данных Next, а HTML в CDN может жить до окончания этого окна.

## 7. SEO, sitemap, ассистент

- `cmsContentLocales` / `cmsLocales` включают `uz`, когда появится uz-контент (этап 9).
- `richTextToPlainText` / `buildDescription` (`src/lib/seo.ts`) и `knowledge.ts` переходят на обход Portable Text; `KB_CACHE_PREFIX` поднимается до `v5`.
- `sitemap.ts`, `news-sitemap.xml`, `image-sitemap.xml`, `sitemap-utils.ts` — вызовы сервисов прежние, фильтр `seo.noIndex` читается из Sanity.

## 8. uz-локаль (цель миграции)

**Точки, которые сейчас блокируют uz** (снимаются, когда uz-контент есть в CMS):

| Где | Что сейчас делает |
|---|---|
| `src/app/[locale]/{news,articles,plants,vacancies}/page.tsx` и `…/[slug\|id]/page.tsx` (8 файлов) | `if (locale === "uz") redirect(... locale: "en")` |
| те же страницы, `generateMetadata` | `alternateLocales: ["en", "ru"]` зашито в код |
| `src/lib/cms-locale.ts` | `resolveCmsLocale` (uz → en), `isUnsupportedCmsLocale` |
| `src/components/LastNewsComponent/TheLastNews.tsx`, `LastPlantsComponent/TheLastPlants.tsx` | `resolveCmsLocale` |
| `src/app/[locale]/ceo/page.tsx` | для uz менеджеры не запрашиваются, должности берутся из словарей |
| `src/app/[locale]/search/page.tsx` | собственная инлайн-подмена `uz → en` |
| `src/lib/popular-news.ts` | особая ветка для uz |
| `src/lib/assistant/knowledge.ts` | uz получает en-дайджест |
| `src/lib/seo.ts`, `src/lib/sitemap-utils.ts` | `cmsContentLocales = ["en", "ru"]` |
| `next.config.js` | `X-Robots-Tag: noindex, follow` для `/uz/(news\|articles\|plants\|vacancies)/*` |

**Поэтапное включение** (перевод всего контента сразу не обязателен):
1. После миграции uz-документы создаются только для переведённых записей.
2. Запросы берут uz, а если перевода нет — en: `*[... && language in [$locale, "en"]] | order(language == $locale desc)[0]`. Для материала без uz-перевода страница отдаётся с `noindex`, uz не попадает в hreflang и sitemap. Редиректы uz → en при этом убираются.
3. Когда перевод полный, `cms-locale.ts` удаляется, а uz включается в `cmsContentLocales` и sitemap.

## 9. Cutover и rollback

1. Sanity: проект, датасеты `production` и `staging`. Схема задеплоена **до** любых операций с контентом.
2. Импорт в `staging` → проверки (счётчики по типам/локалям, все ссылки на ассеты резолвятся, `npx sanity documents validate`, спот-чеки таблиц, картинок, списков и ссылок).
3. Preview-деплой ветки на Vercel с Sanity → проверка **всех трёх локалей** (AGENTS.md §7.6, §8): шапка, меню, поиск, пагинация, карта, формы с Turnstile, метатеги, sitemap, отсутствие ошибок `next/image`.
4. **Content-freeze в Hygraph** → финальный повторный импорт в `production` с `--replace` (импорт идемпотентен).
5. PR → ревью → мерж в `main` (агент не мержит) → прод на Sanity; вебхук переключается на Sanity.
6. Проверка краулером: все старые URL отвечают 200, canonical и hreflang корректны.

**Rollback:** Vercel Instant Rollback на последний деплой с Hygraph. Hygraph остаётся нетронутым и в режиме read-only (freeze) на время окна отката — например, 2 недели. После окончания окна Hygraph можно архивировать.

**Что обновить при cutover:** `AGENTS.md` (стек, §4.1 «Hygraph — единственный источник», env), `README.md`, `.env.example` и `src/lib/server-env.ts` (новые переменные), удалить `graphql-request` и `graphql`, если они больше нигде не используются.

---

## Открытые решения (нужно подтверждение владельца)

1. **Sanity-проект**: создаётся в аккаунте/организации владельца; нужен `projectId`. Датасеты `production` + `staging`.
2. **Где живёт Studio.** Рекомендую отдельную папку `studio/` со своим `package.json` и деплоем на `<name>.sanity.studio`: Studio не попадает в бандл сайта и не пересекается с локализованной маршрутизацией (AGENTS.md §3.1). Это **новая корневая папка**, и по AGENTS.md §2.1 она требует согласования. Альтернатива — встроенная Studio на маршруте `/studio` в Next, но тогда нужно исключение из middleware next-intl.
3. **Новые зависимости** (обоснование в PR, AGENTS.md §6): `next-sanity` (или `@sanity/client`), `@portabletext/react`, `@sanity/image-url`, `@sanity/webhook`. Studio-пакеты (`sanity`, `@sanity/document-internationalization`) живут только в `studio/`.
4. **Показывать ли скрытые подзаголовки `heading-four`** (находка 4). Это видимое изменение на странице.
5. **Битые ссылки** (находка 5): исправить сейчас в Hygraph вручную (изменение контента, AGENTS.md §9) или оставить исправление миграции.
6. **alt-тексты**: кто и когда заполняет недостающие alt (146 ассетов, 312 картинок в теле).
7. **uz-запуск**: перевести весь контент до индексации или включать поэтапно (раздел 8).

---

## Новые переменные окружения (при реализации)

| Переменная | Где | Назначение |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | app | id проекта |
| `NEXT_PUBLIC_SANITY_DATASET` | app | `production` / `staging` |
| `SANITY_REVALIDATE_SECRET` | app, server-env | подпись вебхука |
| `SANITY_API_WRITE_TOKEN` | **только локально** для импорта | запись в датасет; в приложение и Vercel не добавляется |

Датасет публичный, токен на чтение приложению не нужен.

---

## Скрипты миграции

Лежат в `scripts/sanity-migration/`. Это plain ESM `.mjs`, как `scripts/generate-og-image.mjs`, **без новых зависимостей**. Рантайм — Node 24 (`engines: 24.x`, `.nvmrc`). Промежуточные данные пишутся в `scripts/sanity-migration/.data/` (в `.gitignore`: это полный экспорт контента, его нельзя коммитить).

```bash
node --env-file=.env.local scripts/sanity-migration/extract.mjs
```
Read-only снапшот Hygraph в `.data/extracted/`.

```bash
node scripts/sanity-migration/inventory.mjs
```
Отчёт `.data/reports/inventory.json`: счётчики, переводы, узлы RichText, ассеты, slug'и.

```bash
node scripts/sanity-migration/convert-richtext.mjs
```
Конвертация всего RichText в PT, валидация и проверка сохранности текста. При ошибке завершается с ненулевым кодом, поэтому может служить гейтом перед импортом.

```bash
node --test scripts/sanity-migration/richtext-to-portable-text.test.mjs
```
Юнит-тесты конвертера (встроенный `node:test`).

---

## Оценка трудозатрат (инженеро-дни)

Пересчитано по реальным данным: объём меньше ожидаемого, таблиц 4, вложенных списков нет, конвертер уже готов.

| Этап | Дни | Риск |
|---|---|---|
| Sanity-проект, Studio, схемы, i18n-плагин, TypeGen | 2–3 | средний (уникальность slug по языку, `hygraphId`) |
| Трансформ документов в NDJSON + ассеты + импорт + валидация | 2–3 | средний |
| Сервисы на GROQ + клиент | 2–3 | средний |
| Рендерер PT (таблица, галерея, паритет вёрстки) | 2–3 | **высокий** (визуальный паритет) |
| Вебхук, cache-tags | 0,5–1 | низкий |
| SEO / sitemap / ассистент / CSP / next.config | 1–2 | низкий |
| Снятие uz-заглушек (10+ точек) + поэтапный fallback | 1–2 | средний |
| Preview-QA на 3 локалях, cutover, репетиция отката | 1–2 | средний |
| **Итого** | **≈ 12–19 дней** | |

Перевод контента на uz — отдельная редакционная работа, в оценку не входит.
