
// import { useCallback, useEffect } from "react"
// import { cleanObject } from "."
//import { useAsync } from "./use-async"
import { Project } from "../screen/project-list/list";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

/**
 * 把Projects的请求写成hooks
 *  */
export const useProjects =(param?:Partial<Project>)=>{
    const client = useHttp()
    // const {run,...result}=useAsync<Project[]>()
    // const fetchProjects = useCallback(
    //     () =>  
    //     client('projects', { data: cleanObject(param||{})}),
    //     [param,client],
    // )
    // useEffect(() => {
    //    run( fetchProjects(), {
    //        retry: fetchProjects
    //    })
    // }, [param,run,fetchProjects])
    // return result
    //用react-query改造
    return useQuery<Project[]>(['project',param],()=>client('project',{data:param}))//这样param变化就会触发
}

/**
 * 编辑功能 修改PATCH
 * project页面点击小星星，收藏等功能的请求
 */
//不能直接把id:number,param:object写在括号里面 hooks需要放在顶层 这样写会导致useEditProject在函数里面()=>
export const useEditProject = () => {
    //const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const queryClient =useQueryClient()
    // const mutate = (params: Partial<Project>) => {
    //     run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'PATCH'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }
    //用react-query改造
    return useMutation((params:Partial<Project>)=>client(`projects/${params.id}`,{
        method:'PATCH',
        data:params
    }),{
        onSuccess:()=>queryClient.invalidateQueries('projects')
    })
}

/**编辑操作 增 */
export const useAddProject = () => {
    // const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const queryClient =useQueryClient()
    // const mutate = (params: Partial<Project>) => {
    //     run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'POST'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }
    return useMutation(
        (params: Partial<Project>) =>
          client(`projects`, {
            data: params,
            method: "POST",
          }),
       {// 会重新请求一次列表数据
           onSuccess:()=>queryClient.invalidateQueries('projects')
       }
      );
}

/**
 * 获取一个project详情的api
 * @param {id} 要编辑的project的id
 */
export const useProject = (id?:number)=>{
    const client = useHttp()
    //id改变  useQuery重新获取一次
    return useQuery<Project>(
        ['project',{id}],
        ()=>client(`projects/id`),
        //id有值时候才出发
        {enabled:Boolean(id)}
    )
}