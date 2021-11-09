/**获取路由？后的参数(项目列表搜索参数) */
import { useMemo } from "react"
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