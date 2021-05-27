
import {ref} from 'vue'
export const useState = val => {
    const state = ref(val)
    const setState = newVal => state.value = newVal
    return [state,setState]
}