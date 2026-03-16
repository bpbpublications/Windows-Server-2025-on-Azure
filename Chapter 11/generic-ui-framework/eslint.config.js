const typescript = require("@typescript-eslint/eslint-plugin");
const playwright = require("eslint-plugin-playwright");
const typescriptParser = require("@typescript-eslint/parser");
const { configs: typescriptConfigs } = typescript;

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      //...typescriptConfigs.recommended.rules,
      ...playwright.configs["flat/recommended"].rules,
      "no-console": "warn",
      "playwright/no-page-pause": "error",
      "playwright/no-wait-for-timeout": "error",
      "playwright/no-raw-locators": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      //"@typescript-eslint/explicit-function-return-type": "warn",
      "max-lines-per-function": ["warn", 150],
      complexity: ["warn", 10],
    },
  },
];
