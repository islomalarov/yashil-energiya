import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { LANGUAGES } from "./languages";

const CONTENT_TYPES = [
  { type: "news", title: "Новости" },
  { type: "article", title: "Статьи" },
  { type: "plant", title: "СЭС" },
  { type: "vacancy", title: "Вакансии" },
  { type: "manager", title: "Руководство" },
];

const MAP_TYPES = [
  { type: "plantStatus", title: "СЭС по регионам (карта)" },
  { type: "evCharge", title: "Зарядные станции (карта)" },
  { type: "mhp", title: "МикроГЭС (карта)" },
];

// One sub-list per language; "create" inside it uses the plugin's
// `<type>-<language>` template, so new documents get the right language.
function localizedList(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      S.list()
        .title(title)
        .items([
          ...LANGUAGES.map((language) =>
            S.listItem()
              .title(language.title)
              .schemaType(type)
              .child(
                S.documentTypeList(type)
                  .title(`${title} — ${language.title}`)
                  .filter("_type == $type && language == $language")
                  .params({ type, language: language.id })
                  .initialValueTemplates([
                    S.initialValueTemplateItem(`${type}-${language.id}`),
                  ]),
              ),
          ),
          S.divider(),
          S.documentTypeListItem(type).title("Все языки"),
        ]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Контент")
    .items([
      ...CONTENT_TYPES.map(({ type, title }) => localizedList(S, type, title)),
      S.divider(),
      ...MAP_TYPES.map(({ type, title }) =>
        S.documentTypeListItem(type).title(title),
      ),
    ]);
