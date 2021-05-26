import router from '../router/index.js'

/**
 * 
 *利用路由name跳转
 */
export const useRouteNameToPage = routeName =>
    router.push.bind(router, {
        name: routeName
    })

//利用路由路径跳转
export const useRoutePathToPage = routePath =>
    router.push.bind(router, {
        path: routePath
    })

export const useRouterParamChange = type => value => {
    router.push({
        params: {
            [type]: value
        }
    })
}