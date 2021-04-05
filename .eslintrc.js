module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ['error', 'windows'],
    semi: ['error', 'never'],
    'max-len': 'off',

    camelcase: [
      'error',
      { properties: 'never', ignoreDestructuring: true, ignoreImports: true },
    ],
    // 'arrow-parens': ['warn', 'always'],
    'arrow-parens': 'off',
    'vue/max-attributes-per-line': 1,
    'object-curly-newline': 1,
  },
}
