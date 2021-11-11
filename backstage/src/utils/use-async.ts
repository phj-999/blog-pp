import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "."

/**
 * useAsync 
 * 用于异步处理数据，并且含loading各个阶段状态加载 错误处理逻辑
 * */
interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
}
const defaultConfig = {  //把theowonerror变成可选
    throwOnError:false
}
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()

    return useCallback(
        (...args: T[]) => {
            mountedRef.current ? dispatch(...args) : void 0
        },
        [dispatch, mountedRef],
    )
}

export const useAsync = <D>(
    initialState?: State<D>,
    initialConfig?:typeof defaultConfig
    ) => {
        const config = {...defaultConfig,...initialConfig}
        const [state, dispatch] = useReducer(
            (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
            {
              ...defaultInitialState,
              ...initialState,
            }
          );
    
    const safeDispatch = useSafeDispatch(dispatch)

    //const mountedRef = useMountedRef()

    const [retry, setRetry] = useState(()=>()=>{})

    const setData = useCallback(
        (data: D) => safeDispatch({
            data, stat: 'success',
            error: null
        }),
        [safeDispatch],
    )

    const setError = useCallback(
        (error: Error) => safeDispatch({
            error,
            stat: 'error',
            data: null
        }),
        [safeDispatch],
    )
    
    /**run触发异步请求*/
    const run = useCallback(
        (promise: Promise<D>,runConfig?:{retry:()=>Promise<D>}) => {
            if (!promise || !promise.then) {
                throw new Error("请传入promise类型数据");
    
            }
    
            setRetry(()=>()=>{
               if (runConfig?.retry) {
                run(runConfig?.retry(),runConfig)
               }
            })
            
            safeDispatch({ stat: 'loading'})
            
            return promise.then(data => {
                setData(data)
                return data
            }).catch(error => {
                //catch会笑话一场 若不主动抛出 外面接收不到一场 return Promise.reject(error)
                setError(error)
                if (config.throwOnError) return Promise.reject(error)
                return error
            })
        },
        [config.throwOnError,setData, setError,safeDispatch]
    )
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        retry,  //retry调用的时候重新调用一次run
        ...state,       
    }
}