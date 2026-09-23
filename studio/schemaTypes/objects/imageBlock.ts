import { defineType } from "sanity";
import { altField } from "../fields";

// Image inside rich text; rendered with a lightbox gallery on the site.
export const imageBlock = defineType({
  name: "imageBlock",
  title: "Изображение",
  type: "image",
  options: { hotspot: true },
  fields: [altField],
});
