module.exports = {
  root: false,
  env: {
    node: false,
  },
  extends: [
    'plugin:vue/recommended',
    // 'plugin:vue/essential',
  ],
  parser: '@babel/eslint-parser',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'operator-linebreak': [2, 'after'],
    'no-undef': 'off', // atur sesuai kebutuhan
    'no-unused-expressions': 'off', // atur sesuai kebutuhan
    semi: ['error', 'never'],
    'max-len': 'off',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
    // 'arrow-parens': ['warn', 'always'],
    'arrow-parens': 'off',
    'vue/max-attributes-per-line': 0,
    'vue/attributes-order': 0,
    'vue/html-self-closing': 0,
    'object-curly-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/order-in-components': 0,
    'vue/object-shorthand': 0,
    'vue/valid-v-bind': 0,
    'vue/no-parsing-error': 0,
  },
}
