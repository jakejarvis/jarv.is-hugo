module.exports = {
  root: true,
  extends: [
    "@jakejarvis/eslint-config",
    "plugin:compat/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["jsx-a11y", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      modules: true,
      impliedStrict: true,
      jsx: true,
    },
    jsxPragma: null,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    polyfills: ["fetch", "Promise"],
    react: {
      pragma: "h",
      version: "17.0",
    },
  },
  rules: {
    // Mostly cherry-picked from eslint-config-preact:
    // https://github.com/preactjs/eslint-config-preact/blob/v1.3.0/index.js
    "react/display-name": ["warn", { ignoreTranspilerName: false }],
    "react/jsx-key": ["error", { checkFragmentShorthand: true }],
    "react/jsx-no-bind": [
      "warn",
      {
        ignoreRefs: true,
        allowFunctions: true,
        allowArrowFunctions: true,
      },
    ],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-danger": "warn",
    "react/no-deprecated": "error",
    "react/no-unknown-property": ["error", { ignore: ["class"] }], // className in react == class in preact
    "react/prefer-es6-class": "error",
    "react/prefer-stateless-function": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-render-return": "error",
    "react/self-closing-comp": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
  ignorePatterns: ["public/**", "static/assets/**"],
};
