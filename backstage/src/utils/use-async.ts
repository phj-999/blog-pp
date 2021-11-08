import { useState } from "react"

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

export const useAsync = <D>(
    initialState?: State<D>,
    initialConfig?:typeof defaultConfig
    ) => {
        const config = {...defaultConfig,initialConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data: D) => setState({
        data, stat: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })
    //触发异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error("请传入promise类型数据");

        }
        setState({
            ...state, stat: 'loading'
        })
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            //catch会笑话一场 若不主动抛出 外面接收不到一场 return Promise.reject(error)
            setError(error)
            if (config.throwOnError) return Promise.reject(error)
            return error
        })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}