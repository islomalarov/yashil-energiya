import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: { "@next/next": nextPlugin },
    rules: { ...nextPlugin.configs["core-web-vitals"].rules },
  },

  // Node config files (CommonJS) — не трогаем TS-правилами
  {
    files: ["next.config.js", "eslint.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },

  // “Legacy rules” — сначала warnings, потом затянем
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
    },
  },

  { ignores: ["node_modules/**", ".next/**", "dist/**", "out/**"] },
];
