import router from '../router/index.js'

export const useRouteNameToPage = routeName =>
    router.push.bind(router, {
        name: routeName
    })