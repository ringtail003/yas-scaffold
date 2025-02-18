import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import esPlugin from "eslint-plugin-es";
import esNoNewInEs6 from "eslint-plugin-es/lib/configs/no-new-in-es2015.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import plugin from "./lint/plugin.js";

const prettierRules = {
  "prettier/prettier": [
    "error",
    {
      singleQuote: false,
      semi: true,
      tabWidth: 2,
    },
  ],
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    ignores: ["dist/**", "**/*.json", "**/*.js"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        browser: true,
        es5: true,
      },
    },
    plugins: {
      es: esPlugin,
      es6: esNoNewInEs6,
      custom: plugin,
    },
    rules: {
      "es/no-arrow-functions": "error",
      "es/no-optional-chaining": "off",
      "es/no-classes": "error",
      "es/no-rest-spread-properties": "error",
      "es/no-spread-elements": "error",
      "custom/no-wave-dash": "error",
      "no-var": "error",
      ...prettierRules,
    },
  },
  {
    files: ["**/*.d.ts"],
    plugins: {
      es: esPlugin,
    },
    rules: {
      "no-var": "off",
      ...prettierRules,
    },
  },
  {
    files: ["**/*.test.ts", "testing/**/*.ts"],
    rules: {
      "es/no-arrow-functions": "off",
      "es/no-classes": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "es/no-rest-spread-properties": "off",
      "es/no-spread-elements": "off",
      ...prettierRules,
    },
  },
];
