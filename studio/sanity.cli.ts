import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Hosted at https://yashil-energiya.sanity.studio after `npm run deploy`.
  studioHost: "yashil-energiya",
});
