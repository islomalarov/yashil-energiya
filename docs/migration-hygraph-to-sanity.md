# Миграция CMS: Hygraph → Sanity

**Проект:** yashil-energiya.uz — Next.js 16 App Router, React 19, TS, next-intl (en/ru/uz), Vercel.
**Sanity:** проект `ljlv76fi`, датасет `production`, Studio — `studio/` (хостинг `yashil-energiya.sanity.studio`).
**Ветка:** `feature/sanity-migration`. `main` и прод работают на Hygraph до мержа этой ветки.
**Цель:** снять лимит бесплатного Hygraph в 2 локали и вести контент на uz в CMS.

> **Hygraph остаётся боевой CMS**, пока ветка не проверена на preview и не смержена. Скрипты миграции только читают Hygraph (AGENTS.md §9).

---

## Статус

| Этап | Статус |
|---|---|
| Инвентаризация реального контента | ✅ `extract.mjs`, `inventory.mjs` |
| Конвертер RichText → Portable Text | ✅ 160 полей, 0 ошибок, 0 потерь текста, 23 теста |
| Sanity Studio: схемы 8 типов, i18n, структура | ✅ `studio/`, `sanity schema validate` — 0 ошибок |
| Трансформ в NDJSON + проверка ассетов | ✅ 389 документов, 0 ошибок; 448 ассетов доступны |
| Приложение на Sanity: сервисы GROQ, рендер PT, вебхук, SEO, конфиги | ✅ lint / typecheck / build; сервисы проверены на мигрированных данных (24 проверки) |
| **Импорт в Sanity** | ⏳ нужен доступ на запись — см. «Регламент», шаг 1 |
| Деплой Studio, env в Vercel, вебхук | ⏳ после импорта |
| Preview-QA на 3 локалях → мерж → прод | ⏳ |
| Перевод контента на uz и включение индексации uz | ⏳ редакционная работа |

---

## Ключевые решения

| Вопрос | Решение | Почему |
|---|---|---|
| i18n | **Document-level** (`@sanity/document-internationalization`): документ на каждый язык | Фронт рендерит одну локаль на роут; добавление uz не меняет схему; GROQ простой (`language == $locale`) |
| Клиент | **Свой тонкий `fetch`** к Query API (`lib/sanity-client.ts`), без `next-sanity` | У `next-sanity` v13 обязательные peer-зависимости `sanity` + `styled-components` — ~900 пакетов в приложении, и styled-components запрещён AGENTS.md §1. Нужна была только обёртка с `next: { revalidate, tags }` — та же, что была для Hygraph |
| Запросы | **GROQ** | Без `graphql deploy` при каждом изменении схемы, произвольные проекции |
| Rich text | Portable Text, рендер `@portabletext/react` | Структурная конвертация без потерь |
| Ассеты | Перезалив **оригиналов** на `cdn.sanity.io` | Независимость от `graphassets.com`; OG-картинки режутся на CDN (`@sanity/image-url`) |
| URL | **Не меняются** | slug'и и id из Hygraph сохранены (см. «ID и роуты») |
| Studio | Отдельный пакет `studio/` (согласовано) | Не попадает в бандл сайта, не пересекается с маршрутизацией next-intl |
| Rollback | Vercel Instant Rollback на последний деплой с Hygraph | Hygraph не меняется, откат мгновенный |

Зависимости приложения: `+@portabletext/react`, `+@sanity/image-url`, `+@sanity/webhook` (всего 8 пакетов), `−graphql-request`, `−graphql`.

---

## Инвентаризация (снапшот 2026-09-23)

| Hygraph | Sanity | Локализован | Записей (en / ru) | Роут |
|---|---|---|---|---|
| `Article` | `article` | да | 7 / 7 | `/{locale}/articles/{slug}` |
| `New` | `news` | да | 71 / 71 | `/{locale}/news/{slug}` |
| `Plant` | `plant` | да | 20 / 20 | `/{locale}/plants/{id}` |
| `Vacancy` | `vacancy` | да | 2 / 2 | `/{locale}/vacancies/{id}` |
| `Manager` | `manager` | да | 14 / 14 | `/ceo` |
| `EvCharge` | `evCharge` | нет | 15 | карта |
| `Mhp` | `mhp` | нет | 18 | карта |
| `PlantStatus` | `plantStatus` | нет | 14 | карта |
| компонент `Seo` | объект `seo` | да | — | в article/news |
| `DemoComponent` | — | — | — | не переносится (не используется) |

**275 записей-локалей + 114 документов связей переводов = 389 документов.** «513» в Hygraph включали ассеты.

**Находки** (часть — дефекты текущего прода, миграция их исправляет):

1. Переводы en↔ru — 100%; дублей slug нет; **slug'и одинаковы в en и ru** у всех статей и новостей (uz-переводы получают тот же slug).
2. **Ассеты в Hygraph локализованы**: запрос с `locales: [ru]` возвращает `null` для ассета без ru-перевода. Поэтому **на ru-сайте у 10 СЭС видно 1 фото вместо 2–4, у одной новости нет обложки**. Экстрактор берёт ассеты по цепочке `[локаль, остальные]`; в Sanity ассеты не локализуются — у ru все фото.
3. **`heading-four` (6 шт.) сейчас не выводится** (`ThePageContent` → `default: null`): скрыты подзаголовки «Renewable Energy», «Green Energy», «Conclusion:» (en+ru). После миграции видны как `h3`.
4. **4 битые ссылки** в ru-версии `when-does-a-solar-plant-pay-off` (без `https://` → 404). Исправлены при конвертации.
5. **alt**: у 146 из 153 ассетов и 312 из 376 картинок в тексте нет `altText`; сейчас в `alt` попадает имя файла («en.png»). В Sanity `alt` пустой, пока его не заполнят (Studio показывает предупреждение).
6. Таблицы: 4, заголовки строк выведены явным флагом `isHeader`. **На ревью**: во 2-й таблице en-версии `when-does-a-solar-plant-pay-off` нет строки «Показатель | Значение», которая есть в ru, — заголовком стала первая строка данных (как и сейчас на проде).
7. `Plant.power/production/coal/…` — строки (как в Hygraph); `region6` подписан по-разному («Jizzakh» / «Jizakh»).
8. Порядок по умолчанию в Hygraph — `createdAt asc`. Трансформ переносит `_createdAt`, запросы сортируют по нему — списки и «последние СЭС» на главной совпадают.
9. Бесплатный Hygraph ограничивает частоту запросов (429), прод делит этот лимит — экстрактор работает с паузой и backoff.
10. Ассетов к импорту: **448 уникальных, 604 МБ** (оригиналы; картинки в тексте раньше отдавались пережатыми).

---

## Схемы Sanity (`studio/schemaTypes`)

- Документы: `news`, `article`, `plant`, `vacancy`, `manager` (локализованные: `language`, `entryId`) и `plantStatus`, `evCharge`, `mhp` (без языка; `region`/`condition` — списки значений бывших enum).
- Объекты: `richText` (стили `normal/h2/h3/h4/blockquote`, списки, декораторы `strong/em/underline/sup`, аннотация `link { href, openInNewTab }`, блоки `imageBlock`, `table`), `table → tableRow { isHeader, cells[] } → tableCell { content }`, `seo`.
- Картинки: `hotspot` + поле `alt` (предупреждение, если пусто). Размеры берутся из метаданных ассета.
- Координаты — `geopoint`, во фронт отдаются как `[lat, lng]`.
- Structure: каждый тип разбит по языкам; «создать» внутри языка использует шаблон плагина `<type>-<lang>`. Стандартные шаблоны без языка скрыты.

### ID и роуты

- `_id`: `<type>-<hygraphId>-<locale>` / `<type>-<hygraphId>`; связи переводов — `translations-<type>-<hygraphId>`. Без точек (id с точкой в Sanity приватный).
- **`entryId`** — общий id всех языковых версий записи: у перенесённых = id Hygraph. Отдаётся как `id`, поэтому `/plants/{id}`, `/vacancies/{id}` и статистика просмотров новостей в Redis остаются валидными. Плагин при создании перевода копирует документ целиком — `entryId` и `slug` переносятся сами; у новых записей `entryId` генерируется.
- Уникальность `slug` и `entryId` проверяется **в рамках языка** (стандартный `isUnique` ругался бы на переводы).

---

## Приложение

| Область | Что сделано |
|---|---|
| Данные | `lib/sanity-client.ts` (`fetchData` с прежней сигнатурой), `services/*` на GROQ, общие проекции `services/fragments.ts`; формы ответов сохранены |
| Кэш | Все запросы с тегами `lib/cache-tags.ts` + прежний предел 300 с. Данные карт — без кэша (`no-store`, как сейчас: `revalidateTag` на Next 16 оказался ненадёжным, коммит `ef2e027`); они идут через API CDN Sanity, чтобы не расходовать квоту |
| Rich text | `ThePageContent` на `@portabletext/react` с прежними классами стилей; `TheTable` читает `isHeader`; `TheImageModal` без изменений |
| uz | Страницы записей: нет uz-перевода → редирект на en (как сейчас); списки: нет ни одного uz-документа → редирект на en; виджеты, поиск, популярное, ассистент — откат на en (`loadWithFallback` в `src/lib/cms-locale.ts`) |
| SEO | hreflang записи = её реальные языки ∩ `cmsContentLocales` (`cmsAlternateLocales`); sitemap так же; OG-картинки режутся на Sanity CDN |
| Вебхук | `/api/revalidate` проверяет подпись Sanity (`SANITY_REVALIDATE_SECRET`), сбрасывает тег по `_type` |
| Конфиг | `next.config.js`: `images` → `cdn.sanity.io/images/**` (настройки оптимизации прежние), CSP `img-src` → `cdn.sanity.io`, домены Hygraph убраны; preconnect в layout; allowlist `/api/og-image` |

**Выключатель индексации uz** (когда uz-контент готов): добавить `"uz"` в `cmsContentLocales` (`src/lib/seo.ts`) и удалить правило `X-Robots-Tag: noindex` для `/uz/(news|articles|plants|vacancies)` в `next.config.js`. До этого uz-страницы CMS уже работают, но не индексируются и не попадают в hreflang/sitemap.

---

## Регламент: импорт → preview → прод

Все команды — из корня репозитория, Node 24.

### 1. Доступ на запись в Sanity (один раз, владелец)

Любой из вариантов:
- `cd studio && npx sanity login` — интерактивный вход в браузере (достаточно для импорта с этой машины);
- или токен: sanity.io/manage → проект → API → Tokens → **Editor** → в `.env.local` как `SANITY_API_WRITE_TOKEN` (только локально, **не** в Vercel). Для CLI передать как `SANITY_AUTH_TOKEN`.

### 2. Свежий снапшот и сборка датасета

```bash
node --env-file=.env.local scripts/sanity-migration/extract.mjs
node scripts/sanity-migration/inventory.mjs
node scripts/sanity-migration/convert-richtext.mjs
node scripts/sanity-migration/transform.mjs
node scripts/sanity-migration/check-assets.mjs
```

Каждый шаг завершается с ненулевым кодом при ошибке. Отчёты — `scripts/sanity-migration/.data/reports/`.

### 3. Импорт

```bash
cd studio
npx sanity dataset import ../scripts/sanity-migration/.data/transformed/dataset.ndjson production --replace
```

Импорт идемпотентен (детерминированные `_id` и `_key`) — его можно перезапускать. Внимание: `--replace` **перезаписывает** документы, изменённые в Sanity после предыдущего импорта, и **не удаляет** документы, удалённые в Hygraph (сверять счётчики).

### 4. Проверка после импорта

- Счётчики по типам и языкам совпадают с `reports/transform.json` (Vision в Studio или запрос `count(*[_type == "news" && language == "ru"])`).
- `_createdAt` перенёсся: `*[_type == "plant" && language == "en"] | order(_createdAt asc)[0...4].entryId` = первые 4 id из `extracted/plant.en.json`.
- `npx sanity documents validate -y` (из `studio/`) — без ошибок (предупреждения про alt ожидаемы).
- Выборочно в Studio: статья с таблицами, новость с картинками, СЭС с галереей, вакансия.

### 5. Studio

```bash
cd studio
npm run deploy
```

Studio будет доступна на `https://yashil-energiya.sanity.studio`. Для локального `npm run dev` в Manage → API → CORS origins нужен `http://localhost:3333` (с credentials).

### 6. Vercel (Preview для ветки, затем Production)

| Переменная | Значение |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `ljlv76fi` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_REVALIDATE_SECRET` | случайная строка (та же — в вебхуке) |

`NEXT_PUBLIC_HYGRAPH_ENDPOINT` и `HYGRAPH_REVALIDATE_SECRET` новой версии не нужны — удалить из Production **после** мержа (старый деплой для отката использует свои значения).

### 7. Вебхук Sanity (Manage → API → Webhooks)

- URL: `https://yashil-energiya.uz/api/revalidate` (для проверки на preview — URL preview-деплоя)
- Dataset: `production`; триггеры: create, update, delete; только опубликованные документы
- Filter: `_type in ["article","news","plant","vacancy","manager","evCharge","mhp","plantStatus"]`
- Projection: `{ _type, _id, "slug": slug.current }`
- Method: POST; Secret: значение `SANITY_REVALIDATE_SECRET`

На время массового импорта вебхук выключать.

### 8. Preview-QA (AGENTS.md §7.6, §8)

На preview-деплое ветки, на `/en`, `/ru`, `/uz`: главная (последние новости и СЭС), списки и детальные страницы новостей/статей/СЭС/вакансий, таблицы и галереи в статьях, `/ceo`, карты (зарядные станции, микроГЭС, СЭС по регионам), поиск, формы с Turnstile, метатеги и OG-картинки, `sitemap.xml` / `news-sitemap.xml` / `image-sitemap.xml`, отсутствие ошибок `next/image`. Проверить, через сколько правка в Studio видна на сайте (вебхук; для детальных страниц действует CDN-кэш HTML `s-maxage=300`).

### 9. Cutover

1. Content-freeze в Hygraph.
2. Шаги 2–4 (финальный импорт).
3. Env Production (шаг 6), вебхук на прод-домен (шаг 7).
4. PR → ревью → мерж в `main` (агент не мержит) → прод на Sanity.
5. Краулинг: старые URL отвечают 200, canonical и hreflang корректны.

**Rollback:** Vercel Instant Rollback на последний деплой с Hygraph. Hygraph держим в режиме read-only (freeze) на время окна отката, например 2 недели; правки, сделанные за это время в Sanity, при откате в Hygraph не попадут.

---

## Открытые вопросы (владельцу / редакции)

1. Заполнение alt-текстов (146 ассетов, 312 картинок в тексте).
2. Перевод контента на uz и момент включения индексации uz (выключатель выше).
3. Таблица в en-версии `when-does-a-solar-plant-pay-off` без строки-заголовка (находка 6).
4. После окончания Growth Trial проект перейдёт на Free — проверить в Manage, что лимитов хватает (≈390 документов, 448 ассетов / ~600 МБ, 1 датасет, 1 вебхук).
5. `src/components/CeoComponent/TheCeo.tsx` нигде не используется — кандидат на удаление отдельной задачей.

---

## Скрипты миграции (`scripts/sanity-migration/`)

Plain ESM `.mjs`, без зависимостей, Node 24. Данные — в `.data/` (в `.gitignore`: полный экспорт контента).

| Скрипт | Что делает |
|---|---|
| `extract.mjs` | Read-only снапшот Hygraph (8 моделей × локали, ассеты по цепочке локалей, паузы и backoff на 429) |
| `inventory.mjs` | Счётчики, переводы, узлы RichText, ассеты, slug'и → `reports/inventory.json` |
| `convert-richtext.mjs` | RichText → PT для всего контента, валидация и проверка сохранности текста → `reports/richtext.json` |
| `transform.mjs` | Документы Sanity + связи переводов → `transformed/dataset.ndjson`, валидация (обязательные поля, уникальность, ссылки, null) |
| `check-assets.mjs` | HEAD-проверка всех ассетов (доступны, не пустые, тип) → `reports/assets.json` |
| `richtext-to-portable-text.test.mjs` | `node --test scripts/sanity-migration/richtext-to-portable-text.test.mjs` |

---

## Трудозатраты (осталось)

| Этап | Дни |
|---|---|
| Импорт, проверки, деплой Studio, env и вебхук | 0,5–1 |
| Preview-QA на 3 локалях, правки по результатам | 1–2 |
| Cutover и наблюдение | 0,5 |
| **Итого** | **≈ 2–3,5** |

Перевод контента на uz и заполнение alt — редакционная работа, в оценку не входит.
