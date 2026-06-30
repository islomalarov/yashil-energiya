type Translate = (key: string) => string;

export function resolveRegionLabel(
  translate: Translate,
  regionKey: string,
  fallback: string,
) {
  try {
    return translate(regionKey);
  } catch {
    return fallback || regionKey;
  }
}
