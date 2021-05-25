/**
 * 插件集
 * @type { import('vue').Plugin[] }
 */

 import router from '../router/index.js'
 import{ componentsPlugin} from './components.js'

const plugins= [router, componentsPlugin]

/**
 * 批量注册插件
 * @param { import ('vue').App } app
 */


export const usePlugins = app =>
   plugins.forEach(plugin => app.use(plugin),app)
//可简写成export const usePlugins = app => plugins.forEach(app.use,app)


