import { useMemo } from "react";
import { useSearchParams,URLSearchParamsInit } from "react-router-dom";
import { cleanObject } from "./index";

/**
 * 返回页面url中指定键的参数值 
 * @setSearchParam 改变url中的参数值
 * */
 export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()  //返回路由地址所有参数的信息.get(key)返回与给定搜索参数关联的第一个值。 
    return [
        useMemo(
            () => keys.reduce((prev, key: K) => {
            return {...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]
            ),
        (params: Partial<{ [key in K]:unknown }>) => {
            const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
            return setSearchParam(o) 
        }
    ] as const
}
//返回最原始类型