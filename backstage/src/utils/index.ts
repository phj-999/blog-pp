import { useEffect,useRef,useState } from "react"


export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
//避免value为0的情况
export const isFalsy = (value:any) => value ===0?false : !value //!!表示把一个值转成布尔值
//在函数中 
export const cleanObject = (object?: { [key: string]: unknown }) =>{
    if (!object) {
        return {};
      }
      const result = { ...object };
      Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
          delete result[key];
        }
      });
      return result;
}

//对useEffect封装  避免写的时候全页面都是useffect带着[]
export const useMount = (callback:() => void) =>{
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

//防抖
// const debounce = (func,delay)=>{
//     let timeout
//     return (...param) =>{
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout =setTimeout(function () {
//             func(...param)
//         }, delay);
//     }
// }
//防抖hooks
export const useDebounce = <V>(value: V, delay?:number)=>{
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        //每次value变化 设置一个定时器
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        //每次上一个useEffect处理完清理完后再运行
        return () => clearTimeout(timeout)
    }, [value,delay])

    return debouncedValue
}
/**
 *  改变页面title 
 *  页面加载时: 旧title加载后：新title
 * */
export const useDocumentTitle = (title:string,keepOnunmount:boolean=true)=>{
  const oldTitle = useRef(document.title).current
  console.log('渲染时',oldTitle);
  
  useEffect(() => {
   document.title=title
    }, [title])

  useEffect(() => {
    return () => {//页面卸的时候调用
      if (!keepOnunmount) {
        document.title = oldTitle
      }
    }
     // 如果不指定依赖，读到的就是旧title
  }, [keepOnunmount, oldTitle])
}

/**
 * 重置路由状态 刷新整个页面
 *  */
export const resetRoute = () => window.location.href=window.location.origin

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current=true
    return () => {
      mountedRef.current=false
    }
  })
  return mountedRef
}