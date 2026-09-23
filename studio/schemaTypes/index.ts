import { article } from "./documents/article";
import { manager } from "./documents/manager";
import { evCharge, mhp, plantStatus } from "./documents/mapAssets";
import { news } from "./documents/news";
import { plant } from "./documents/plant";
import { vacancy } from "./documents/vacancy";
import { imageBlock } from "./objects/imageBlock";
import { link, richText } from "./objects/richText";
import { seo } from "./objects/seo";
import { table, tableCell, tableRow } from "./objects/table";

export const schemaTypes = [
  // documents
  news,
  article,
  plant,
  vacancy,
  manager,
  plantStatus,
  evCharge,
  mhp,
  // objects
  richText,
  link,
  imageBlock,
  table,
  tableRow,
  tableCell,
  seo,
];
