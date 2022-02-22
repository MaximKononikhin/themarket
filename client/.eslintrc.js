module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "import",
    "@typescript-eslint",
    "css-modules",
    "simple-import-sort",
    "unicorn",
    "react-hooks",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:css-modules/recommended",
    "plugin:react-hooks/recommended",
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        // TODO: enable
        //"plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {},
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: __dirname,
      },
    },
    "import/ignore": ["superstruct-ts-transformer"],
  },
  rules: {
    "react/jsx-equals-spacing": 2,
    "react/jsx-key": 2,
    "react/jsx-no-comment-textnodes": 2,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-pascal-case": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/require-render-return": 2,
    "react/self-closing-comp": 2,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "react-hooks/exhaustive-deps": 2,

    "css-modules/no-unused-class": 2,
    "css-modules/no-undef-class": 2,

    "import/no-duplicates": 0,

    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ["^@?\\w"],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ["^"],

          ["^blocks", "^components", "^lib", "^models", "^services"],
          ["^resources", "^styles"],

          // Relative imports.
          // Anything that starts with a dot.
          ["^\\."],
        ],
      },
    ],

    "no-restricted-syntax": [
      "error",
      {
        selector: 'ImportDeclaration[source.raw=/^"\\.\\./]',
        message: "disallow import from parent",
      },
      "error",
      {
        selector: 'ImportDeclaration[source.raw=/^"[^.].*\\.module\\.scss"$/]',
        message: "allow import .module.scss from current directory only",
      },
    ],

    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],

    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  globals: {
    Promise: true,
  },
};
