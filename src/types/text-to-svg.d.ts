declare module "text-to-svg" {
  type TextAnchor =
    | "left"
    | "center"
    | "right"
    | "top"
    | "middle"
    | "bottom"
    | "left top"
    | "left middle"
    | "left bottom"
    | "center top"
    | "center middle"
    | "center bottom"
    | "right top"
    | "right middle"
    | "right bottom";

  type TextToSvgOptions = {
    x?: number;
    y?: number;
    fontSize?: number;
    anchor?: TextAnchor;
    attributes?: Record<string, string>;
  };

  type TextToSvgRenderer = {
    getD: (text: string, options?: TextToSvgOptions) => string;
  };

  const TextToSVG: {
    loadSync: (file?: string) => TextToSvgRenderer;
  };

  export default TextToSVG;
}
