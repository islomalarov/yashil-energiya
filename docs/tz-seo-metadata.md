# ФТ: CMS-управляемые SEO-метаданные для новостей и статей (Hygraph + Next.js)

**Проект:** yashil-energiya.uz — Next.js App Router, React 19, TS, next-intl (en/ru/uz), Hygraph CMS (graphql-request), Vercel.
**Статус кода на момент составления:** централизованный SEO-слой в `src/lib/seo.ts` уже есть; JSON-LD (NewsArticle/Article + BreadcrumbList + Organization + WebSite), динамический `sitemap.ts`, `news-sitemap.xml`, `image-sitemap.xml`, `robots.ts`, hreflang (en/ru + x-default), `/api/og-image` — **реализованы**. Поле `excerpt` в CMS **есть**.
**Задача этого ФТ:** добавить управляемые из CMS мета-поля (компонент `Seo`) + fallback-цепочку, `dateModified` из `updatedAt`, исключение `noIndex` из sitemap, открыть `/api/og-image` в robots, убрать статичные keywords.

> Уже реализованное (hreflang, Organization/Breadcrumb JSON-LD, sitemap-структура, og-image) **повторно не внедрять** — только точечные доработки ниже.

---

## Ключевые поправки к исходному ТЗ (обязательны)

1. **hreflang: НЕ добавлять `uz`.** Контент в CMS только en/ru (`cmsContentLocales`), а `/uz/news/*` и `/uz/articles/*` делают redirect на en (`news/[slug]/page.tsx`, `cms-locale.ts`). hreflang обязан указывать на страницы 200, не на редиректы. Оставить `alternateLocales: ["en","ru"]`. uz включать только когда появится uz-контент.
2. **robots: открыть `/api/og-image`.** Сейчас `Disallow: /api/` закрывает og-image от соц-краулеров. Добавить `Allow: /api/og-image`.
3. **title новостей/статей — без бренд-суффикса.** Шаблон `%s | Yashil Energiya` даёт 60+18 > 65 симв. Возвращать `title: { absolute: title }`, чтобы бренд не приклеивался.

---

## Этап 1 — Hygraph (вручную в консоли)

### 1.1. Компонент `Seo` (apiId `Seo`)

| Поле | apiId | Тип | Локализация | Настройки |
|---|---|---|---|---|
| Meta Title | `metaTitle` | Single line text | ✅ | optional. «≤60 симв., тема в начале, без бренда. Пусто → заголовок материала» |
| Meta Description | `metaDescription` | Multi line text | ✅ | optional. «150–160 симв., факт/цифра + зачем читать. Пусто → первый абзац» |
| OG Image | `ogImage` | Asset (single) | — | optional. «1200×630. Пусто → обложка материала» |
| No Index | `noIndex` | Boolean, default `false` | — | «Скрыть от поисковиков» |
| Canonical URL | `canonicalUrl` | Single line text | — | optional. «Только для перепечаток. Обычно пусто» |

Все поля **опциональны** — публикация не блокируется. Keywords не заводим.

### 1.2. Подключение
- Модель **News** → добавить поле `seo`, тип **Component → Seo**, single, optional.
- Модель **Articles** → то же.
- Поле `seo` не локализуем; локализованы только `metaTitle`/`metaDescription`.

### 1.3. Права API
- Токен из `lib/graphql-client.ts` должен читать News/Articles в стадии **Published**. Новые поля наследуют доступ модели. Проверить в Project settings → API Access.

### 1.4. `updatedAt`
- Системное поле, создавать не нужно — только добавить в запрос (этап 2).

---

## Этап 2 — Типы и GraphQL

### 2.1. Общий тип
`services/news.service.types.ts`:
```ts
export interface SeoFields {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: { url: string } | null;
  noIndex?: boolean | null;
  canonicalUrl?: string | null;
}
```
- `NewResponse` и `Article` (`articles.service.ts`) → добавить `updatedAt: string` и `seo?: SeoFields | null`.

### 2.2. Запросы (фрагмент добавить в getOne* и getAll*)
`news.service.ts` (getOneNews, getAllNews), `articles.service.ts` (getOneArticle, getAllArticles):
```graphql
updatedAt
seo {
  metaTitle
  metaDescription
  ogImage { url }
  noIndex
  canonicalUrl
}
```
Локаль уже в `locales: [$locale]` — локализованные seo-поля вернутся корректно. `getAll*` нужны `seo { noIndex }` + `updatedAt` для sitemap.

---

## Этап 3 — Утилиты `src/lib/seo.ts`

1. `smartTruncate` — переиспользовать существующий `truncateSeoText` (уже режет по слову, «…» только при обрезке).
2. `buildDescription(seo?, excerpt?, body?)`:
   - `seo` → `smartTruncate(seo, 160)`;
   - иначе `excerpt` → обрезка по границе **предложения** ≤160 (fallback по слову);
   - иначе первый абзац `body` (plain text).
   - хелпер `richTextToPlainText(nodes)` — рекурсивно из `raw.children`.
3. `buildTitle(seo?, title)` → `seo?.metaTitle?.trim() || smartTruncate(title, 60)`.
4. `createMetadata` — расширить `MetadataOptions`:
   - `noIndex?: boolean` → `index: shouldIndex && !noIndex`;
   - `canonicalOverride?: string` → если задан, canonical = он.
5. hreflang — **без изменений**, uz не добавлять (поправка 1).

---

## Этап 4 — generateMetadata (news + articles, симметрично)

```ts
const seo = item.seo;
const title = buildTitle(seo?.metaTitle, item.title);
return createMetadata({
  locale,
  path: `/news/${slug}`,
  title: { absolute: title },                         // поправка 3: без бренда
  description: buildDescription(seo?.metaDescription, item.excerpt, item.description?.raw?.children),
  image: optimizedOgImagePath(seo?.ogImage?.url ?? item.cover?.url, { title: item.title, cta }),
  type: "article",
  publishedTime: item.date,                            // у статей поля date нет
  modifiedTime: item.updatedAt,
  noIndex: seo?.noIndex ?? false,
  canonicalOverride: seo?.canonicalUrl ?? undefined,
  alternateLocales: ["en", "ru"],
});
```
- В теле страницы в `articleJsonLd(...)` пробросить `modifiedTime: item.updatedAt`.

---

## Этап 5 — sitemap + robots

- `sitemap.ts`: `sitemapEntry` расширить необязательным `lastModified` (fallback `now`); фильтровать `!item.seo?.noIndex`; `lastModified = item.updatedAt`. Локали — `cmsLocales` (en/ru), uz не добавлять.
- `news-sitemap.xml/route.ts`: исключить `noIndex`.
- `robots.ts` (поправка 2):
  ```ts
  allow: ["/", "/api/og-image"],
  disallow: ["/api/", "/_vercel/", "/en/taplink", "/ru/taplink", "/uz/taplink"],
  ```

---

## Этап 6 — Чистка
- Убрать статичный `keywords` из `src/app/[locale]/layout.tsx`.

---

## Порядок коммитов (ветка `feature/seo-metadata`)
1. *(вручную в Hygraph — этап 1, apiId зафиксировать в PR)*
2. `feat(seo): query seo component + updatedAt for news/articles`
3. `feat(seo): metadata fallback utils (buildTitle/buildDescription)`
4. `feat(seo): wire CMS seo into generateMetadata + json-ld dateModified`
5. `feat(seo): exclude noIndex + updatedAt in sitemaps; open og-image in robots`
6. `chore(seo): drop static keywords`

---

## Критерии приёмки
- [ ] Новость без `seo`: title/description по границе слова/предложения, `dateModified` = реальный `updatedAt`.
- [ ] Новость с `seo`: title/description/ogImage из CMS (en и ru).
- [ ] `noIndex=true` → `robots: noindex` и нет в sitemap.
- [ ] `canonicalUrl` заполнен → canonical = это значение.
- [ ] hreflang = en, ru, x-default (uz нет), ссылки на 200.
- [ ] robots.txt: `Disallow: /api/` + `Allow: /api/og-image`.
- [ ] title новостей/статей без «| Yashil Energiya».
- [ ] JSON-LD валиден (Rich Results Test); `/api/og-image` работает как прежде.
- [ ] `npm run lint && npm run typecheck && npm run build` — зелёные.

---

## Регламент для редакторов (в описания полей Hygraph)
- `metaTitle`: ≤60 симв., тема в начале, без «Yashil Energiya».
- `metaDescription`: 150–160 симв., «главный факт/цифра + что узнает читатель».
- Заполнять обязательно только для важных/«вечнозелёных» материалов; для рутинных — работает fallback.
