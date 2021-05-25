/**
 * 滚动事件
 */
import {onUnmounted} from 'vue'

export const usewindowEvent = (eventType,callback) => {
    window.addEventListener(eventType,callback)

    const removeEventHandler = () => 
      window.removeEventListener (eventType, callback)
    onUnmounted(removeEventHandler)
}
