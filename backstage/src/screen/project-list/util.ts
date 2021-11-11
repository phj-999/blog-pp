/**获取路由？后的参数(项目列表搜索参数) */
import { useMemo, useState } from "react"
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
 * @returns 返回项目关闭和创建的状态 
 *  */
export const useProjectModal = () => {
    const [{projectCreate},setProjectCreate]=useUrlQueryParam(['projectCreate'])
    
    const open = () => setProjectCreate({projectCreate:true})
    const close =() =>setProjectCreate({projectCreate:undefined})
    
   return {
       projectModalOpen: projectCreate === 'true',
       open,
       close
   }
}