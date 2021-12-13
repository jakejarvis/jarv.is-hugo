module.exports = {
  root: true,
  extends: ["@jakejarvis/eslint-config", "preact", "plugin:jsx-a11y/recommended", "plugin:prettier/recommended"],
  plugins: ["jsx-a11y", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: ["public/**", "static/assets/**"],
};
