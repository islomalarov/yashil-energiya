export function getDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
  }).format(new Date(date));
}
