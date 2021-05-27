import { ref,watchEffect } from 'vue'

export const uselocalStorage = key => {
    const storage  = ref (localStorage.getItem(key))  //获取localStorage
    const stop = watchEffect(()=>{
        localStorage.setItem (key,storage.value)  //设置localStorage
    })
    return [storage,stop]
}