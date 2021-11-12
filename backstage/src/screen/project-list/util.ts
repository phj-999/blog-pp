/**获取路由？后的参数(项目列表搜索参数) */
import { useMemo, useState } from "react"
import { useProject } from "../../utils/project"
import { useUrlQueryParam } from "../../utils/url"

export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']) //路径中参数为?name=''&personId=''
    return [
        useMemo(() => (
            { 
                ...param, personId: Number(param.personId) || undefined 
            }
            ), [param]),
        setParam
    ]  as const
}

/**
 * 管理模态框状态的hook（创建和关闭）
 * @returns 返回判断项目关闭和创建的状态 
 *  */
export const useProjectModal = () => {
    const [{projectCreate},setProjectCreate]=useUrlQueryParam(['projectCreate'])
    //正在编辑项目的ID
    const [{editingProjectId},setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    const{data:editingProject,isLoading}=useProject(Number(editingProjectId))
    
    const open = () => setProjectCreate({projectCreate:true})
    const close =() =>{
        setProjectCreate({projectCreate:undefined});
        setEditingProjectId({editingProjectId:undefined})
    }
    const startEdit = (id:number) =>setEditingProjectId({editingProjectId:id})
   
    return {
       projectModalOpen: projectCreate === 'true'||Boolean(editingProjectId),
       open,
       close,
       startEdit,
       editingProject,
       isLoading
   }
}