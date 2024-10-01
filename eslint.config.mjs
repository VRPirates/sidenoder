import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import html from "eslint-plugin-html";
import json from "eslint-plugin-json";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.js", "**/*.html", "**/*.twig"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        $: "readonly",
        $id: "readonly",
        arch: "readonly",
        checkMount: "readonly",
        dialog: "readonly",
        formatBytes: "readonly",
        formatEta: "readonly",
        hash_alg: "readonly",
        id: "readonly",
        ipcRenderer: "readonly",
        loadInclude: "readonly",
        path: "readonly",
        platform: "readonly",
        remote: "readonly",
        shell: "readonly",
        sidenoderHome: "readonly",
        version: "readonly",
        win: "readonly",
      },
    },
    plugins: {
      html,
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/brace-style": [
        "error",
        "1tbs",
        { allowSingleLine: false },
      ],
      "@stylistic/js/indent": [
        "error",
        2,
        {
          ignoredNodes: ["TemplateLiteral"],
          SwitchCase: 1,
        },
      ],
      "@stylistic/js/no-mixed-spaces-and-tabs": ["error"],
      "@stylistic/js/semi": ["error", "always"],
      "constructor-super": ["error"],
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "for-direction": ["error"],
      "getter-return": ["error"],
      "no-async-promise-executor": ["error"],
      "no-case-declarations": ["error"],
      "no-class-assign": ["error"],
      "no-compare-neg-zero": ["error"],
      "no-cond-assign": ["error"],
      "no-const-assign": ["error"],
      "no-constant-condition": ["error"],
      "no-control-regex": ["error"],
      "no-debugger": ["error"],
      "no-delete-var": ["error"],
      "no-dupe-args": ["error"],
      "no-dupe-class-members": ["error"],
      "no-dupe-else-if": ["error"],
      "no-dupe-keys": ["error"],
      "no-duplicate-case": ["error"],
      "no-else-return": ["error"],
      "no-empty": ["error"],
      "no-empty-character-class": ["error"],
      "no-empty-pattern": ["error"],
      "no-ex-assign": ["error"],
      "no-extra-boolean-cast": ["off"],
      "no-fallthrough": ["error"],
      "no-func-assign": ["error"],
      "no-global-assign": ["error"],
      "no-import-assign": ["error"],
      "no-inner-declarations": ["off"],
      "no-invalid-regexp": ["error"],
      "no-irregular-whitespace": ["error"],
      "no-loss-of-precision": ["error"],
      "no-misleading-character-class": ["error"],
      "no-nonoctal-decimal-escape": ["error"],
      "no-obj-calls": ["error"],
      "no-octal": ["error"],
      "no-prototype-builtins": ["error"],
      "no-redeclare": ["error"],
      "no-regex-spaces": ["error"],
      "no-self-assign": ["error"],
      "no-setter-return": ["error"],
      "no-shadow-restricted-names": ["error"],
      "no-sparse-arrays": ["error"],
      "no-this-before-super": ["error"],
      "no-undef": ["error"],
      "no-unexpected-multiline": ["error"],
      "no-unreachable": ["error"],
      "no-unsafe-finally": ["error"],
      "no-unsafe-negation": ["error"],
      "no-unsafe-optional-chaining": ["error"],
      "no-unused-labels": ["error"],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-use-before-define": [
        "error",
        {
          functions: false,
          classes: true,
          variables: true,
          allowNamedExports: true,
        },
      ],
      "no-useless-backreference": ["error"],
      "no-useless-catch": ["error"],
      "no-useless-escape": ["error"],
      "no-var": ["error"],
      "no-with": ["error"],
      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],
      "prefer-regex-literals": ["error"],
      "prefer-template": ["error"],
      "require-yield": ["error"],
      "use-isnan": ["error"],
      "valid-typeof": ["error"],
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["**/*.json"],
    plugins: {
      json,
    },
    processor: json.processors[".json"],
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  {
    ignores: ["**/node_modules/**", "**/*.min.js", "**/modernizr.custom.js"],
  },
];