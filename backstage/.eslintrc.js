module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint/eslint-plugin",
        "prettier"
    ],
    settings: {
        react: {
            "version": "detect"
        }
    },
    rules: {
        "no-console": process.env.NODE_ENV === 'production'
            ? 'error'
            : 'off',
        "no-debugger": process.env.NODE_ENV === 'production'
            ? 'error'
            : 'off',
        "prettier/prettier": "error",

        "no-var": 2,// 禁用var，用let和const代替

        "quotes": [2, "single"],   // 开启强制单引号

        "arrow-spacing": [2, { before: true, after: true }],// 箭头函数，箭头前后空格

        "comma-dangle": [2, "never"], // 禁止对象最后一项逗号    
    }
}
