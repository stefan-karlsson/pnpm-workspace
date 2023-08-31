/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'off',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  parser: 'typescript',
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: true, // only on those files explicitly asked for
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false
};

module.exports = config;
