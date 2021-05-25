module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins":[
    [
      'import',
      {
        'libraryName': 'ant-design-vue',
        'libraryDirectory': "es",
        'style': 'css'
      },
      'ant-design-vue'
    ],
    [//图标
      'import',
      {
        'libraryName': 'ant-design-vue',
        'libraryDirectory': "",
       ' style': false,
        "camel2DashComponentName": false,
      },
      '@ant-design/icons-vue'
    ]
  ]
}
