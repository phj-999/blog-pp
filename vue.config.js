const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

function resolve(dir) {
  //path.join(__dirname)设置绝对路径
  return path.join(__dirname, dir)
}
module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',
  //打包后加载静态资源的目录
  publicPath: './',
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  // 别名字路径
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  }
}
