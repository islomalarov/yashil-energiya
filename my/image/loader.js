"use client";
// const imageLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
// };
export default function myImageLoader({ src, width, quality }) {
  return `https://www.yashil-energiya.uz/${src}?w=${width}&q=${quality || 75}`;
}
