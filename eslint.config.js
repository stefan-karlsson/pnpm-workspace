// @ts-expect-error No definition for this one
import eslintJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import standardConfig from 'eslint-config-standard';
import deprecationPlugin from 'eslint-plugin-deprecation';
// @ts-expect-error No definition for this one
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error No definition for this one
import importNewlinesPlugin from 'eslint-plugin-import-newlines';
// @ts-expect-error No definition for this one
import nPlugin from 'eslint-plugin-n';
// @ts-expect-error No definition for this one
import promisePlugin from 'eslint-plugin-promise';
// @ts-expect-error No definition for this one
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
// @ts-expect-error No definition for this one
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

const EXT_JS = ['.cjs', '.js', '.mjs'];
const EXT_TS = ['.ts', '.tsx'];
const EXT_ALL = [...EXT_JS, ...EXT_TS];

/**
 * @internal
 * Converts a list of EXT_* defined above to globs
 * @param {string[]} exts
 * @returns {string[]}
 */
function extsToGlobs (exts) {
  return exts.map((e) => `**/*${e}`);
}

export const overrideJs = {
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/restrict-plus-operands': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off'
};

export const overrideSpec = {
  // in the specs we are a little less worried about
  // specific correctness, i.e. we can have dangling bits
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  'vitest/consistent-test-filename': 'error',
  'vitest/consistent-test-it': 'error',
  'vitest/max-nested-describe': ['error', { max: 3 }]
};

export const overrideAll = {
  // the next 2 enforce isolatedModules & verbatimModuleSyntax
  '@typescript-eslint/consistent-type-exports': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/dot-notation': 'error',
  '@typescript-eslint/indent': ['error', 2],
  '@typescript-eslint/no-non-null-assertion': 'error',
  // ts itself checks and ignores those starting with _, align the linting
  '@typescript-eslint/no-unused-vars': ['error', {
    args: 'all',
    argsIgnorePattern: '^_',
    caughtErrors: 'all',
    caughtErrorsIgnorePattern: '^_',
    destructuredArrayIgnorePattern: '^_',
    vars: 'all',
    varsIgnorePattern: '^_'
  }],
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/type-annotation-spacing': 'error',
  'arrow-parens': ['error', 'always'],
  'brace-style': ['error', '1tbs'],
  curly: ['error', 'all'],
  'default-param-last': 'off', // conflicts with TS version
  'deprecation/deprecation': 'error',
  'dot-notation': 'off', // conflicts with TS version
  'func-style': ['error', 'declaration', {
    allowArrowFunctions: true
  }],
  'function-call-argument-newline': ['error', 'consistent'],
  'import-newlines/enforce': ['error', {
    forceSingleLine: true,
    items: 2048
  }],
  'import/export': 'error',
  'import/extensions': ['error', 'ignorePackages', {
    cjs: 'always',
    js: 'always',
    json: 'always',
    jsx: 'never',
    mjs: 'always',
    ts: 'never',
    tsx: 'never'
  }],
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-duplicates': 'error',
  'import/order': 'off', // conflicts with simple-import-sort
  indent: 'off', // required as 'off' since typescript-eslint has own versions
  'no-extra-semi': 'error',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'object-curly-newline': ['error', {
    ExportDeclaration: { minProperties: 2048 },
    ImportDeclaration: { minProperties: 2048 },
    ObjectPattern: { minProperties: 2048 }
  }],
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
    { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
    { blankLine: 'always', next: 'block-like', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'block-like' },
    { blankLine: 'always', next: 'function', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'function' },
    { blankLine: 'always', next: 'try', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'try' },
    { blankLine: 'always', next: 'return', prev: '*' },
    { blankLine: 'always', next: 'import', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'import' },
    { blankLine: 'any', next: 'import', prev: 'import' }
  ],
  semi: ['error', 'always'],
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': ['error', {
    groups: [
      ['^\u0000'],
      ['^[^/\\.]'],
      ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'] // local (. last)
    ]
  }],
  'sort-destructure-keys/sort-destructure-keys': ['error', {
    caseSensitive: true
  }],
  'sort-keys': 'error',
  'spaced-comment': ['error', 'always', {
    block: {
      // pure export helpers
      markers: ['#__PURE__']
    },
    line: {
      // TS reference types
      markers: ['/ <reference']
    }
  }]
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      '**/.github/',
      '**/.vscode/',
      '**/.husky/',
      '**/coverage/**',
      '**/dist/**',
      '**/pnpm-lock.yaml',
      '**/pnpm-workspace.yaml'
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.eslint.json',
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      deprecation: deprecationPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      import: importPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'import-newlines': importNewlinesPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      n: nPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      promise: promisePlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'simple-import-sort': simpleImportSortPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'sort-destructure-keys': sortDestructureKeysPlugin
    },
    settings: {
      'import/extensions': EXT_ALL,
      'import/parsers': {
        '@typescript-eslint/parser': EXT_TS,
        espree: EXT_JS
      },
      'import/resolver': {
        node: {
          extensions: EXT_ALL
        },
        typescript: {
          project: './tsconfig.eslint.json'
        }
      }
    }
  },
  {
    files: extsToGlobs(EXT_JS),
    rules: {
      ...overrideJs
    }
  },
  {
    files: extsToGlobs(EXT_ALL),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...eslintJs.configs.recommended.rules,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...standardConfig.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,
      ...overrideAll
    }
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.spec.ts'
    ],
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals
      }
    },
    plugins: {
      vitest: vitestPlugin

    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      ...overrideSpec
    }
  }
];
