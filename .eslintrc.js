module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    // 自定义规则
    // 声明未使用变量时抛错
    'no-unused-vars': ['error', 'always'],
    // 关闭不能使用console的规则
    'no-console': 'off'
  },
  globals: {}
}
