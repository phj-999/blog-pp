
import { useEffect } from "react"
import { cleanObject } from "."
import { useAsync } from "./use-async"
import { Project } from "../screen/project-list/list";
import { useHttp } from "./http";

/**
 * 把部分请求写成hooks
 *  */
export const useProjects =(param?:Partial<Project>)=>{
    const client = useHttp()
    const {run,...result}=useAsync<Project[]>()

    useEffect(() => {
       run( client('project', { data: cleanObject(param||{}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}