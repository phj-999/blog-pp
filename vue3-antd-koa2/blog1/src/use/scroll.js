/**
 * 滚动事件的使用
 */

import{ ref} from 'vue'
import {usewindowEvent} from './event'

export const useWindowScrollStatus = () => {
    const status = ref (false)

    const judgeScrollStatusHandler = () => {
        const {scrollTop} = document.documentElement
        status.value = scrollTop > 0 ? true : false  
    }
    usewindowEvent('scroll', judgeScrollStatusHandler)
    return status
}