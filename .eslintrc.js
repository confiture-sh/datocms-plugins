module.exports = {
  // specifies the eslint parser
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // allows for the parsing of modern ecmascript features
    ecmaVersion: 2019,
    // allows for the use of imports
    sourceType: 'module',
    // Allows for the parsing of JSX
    jsx: true,
    useJSXTextNode: true,
  },
  env: {
    // browser global variables.
    browser: true,
    // allows es6 global variable
    es6: true,
  },
  settings: {
    react: {
      // tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect',
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [, 'prettier'],
  rules: {
    'prettier/prettier': ['error', require('./.prettierrc.js')],

    // Typescript mandatories rules
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    // Jam Stack / React rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}', '"'] }],
  },
}
