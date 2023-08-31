/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'off',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  jsxSingleQuote: true,
  parser: 'typescript',
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false
};

module.exports = config;
