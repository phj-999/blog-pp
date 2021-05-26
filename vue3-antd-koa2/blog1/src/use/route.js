import {
    useRoute
} from 'vue-router';
import {
    computed,ref,watchEffect
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

export const useLinkdRouteParam = (type,isNum=true) =>{
    const route =useRoute()
    const currentParam = ref('')
    watchEffect(()=>{
        const param = route.params[type]
        currentParam.value =isNum? Number(param) :param
    })
    return currentParam
}