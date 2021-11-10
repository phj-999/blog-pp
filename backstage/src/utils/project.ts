
import { useCallback, useEffect } from "react"
import { cleanObject } from "."
import { useAsync } from "./use-async"
import { Project } from "../screen/project-list/list";
import { useHttp } from "./http";

/**
 * 把Projects的请求写成hooks
 *  */
export const useProjects =(param?:Partial<Project>)=>{
    const client = useHttp()
    const {run,...result}=useAsync<Project[]>()
    const fetchProjects = useCallback(
        () =>  
        client('projects', { data: cleanObject(param||{})}),
        [param,client],
    )
    useEffect(() => {
       run( fetchProjects(), {
           retry: fetchProjects
       })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param,run,fetchProjects])
    return result
}

/**
 * 编辑功能 修改PATCH
 * project页面点击小星星，收藏等功能的请求
 */
//不能直接把id:number,param:object写在括号里面 hooks需要放在顶层 这样写会导致useEditProject在函数里面()=>
export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}

/**编辑操作 增 */
export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}