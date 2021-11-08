import { useEffect } from "react";
import { cleanObject } from ".";
import { User } from "../screen/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
//抽离user的请求  写成hooks
export const useUsers= (param?:Partial<User>) => {
    const client = useHttp()
    const {run,...result}=useAsync<User[]>()

    useEffect(() => {
       run( client('users', { data: cleanObject(param||{}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}