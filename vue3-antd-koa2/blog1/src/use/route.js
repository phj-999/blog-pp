import {
    useRoute
} from 'vue-router';
import {
    computed
} from 'vue';

/**
 * 
 * 判断是否在路由白名单  搭配v-if
 */

export const useNotOnRouteWhiteListStatus = (
    whiteList = []
) => {
    const route = useRoute()
    const status = computed(
        () => !whiteList.includes(route.name)
    )
    return status
}