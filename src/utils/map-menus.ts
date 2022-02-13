import { RouteRecordRaw } from 'vue-router'

/**
 * @function 符合条件的菜单userMenus映射到路由数组routes里面
 * @return { RouteRecordRaw[] }  返回一个routes的数组
 * @todo 下一步添加到main的children里面
 * */
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1'先去加载所有的默认routes
  const allRoutes: RouteRecordRaw[] = []
  //拿到该目录下的文件  路径，是否递归查找，正则匹配.ts文件结尾
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2.根据菜单获取需要添加的routes  递归调用
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
