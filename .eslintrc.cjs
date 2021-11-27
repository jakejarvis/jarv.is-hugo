module.exports = {
  root: true,
  extends: ["@jakejarvis/eslint-config", "preact", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
  },
  ignorePatterns: ["public/**", "static/assets/**"],
};
