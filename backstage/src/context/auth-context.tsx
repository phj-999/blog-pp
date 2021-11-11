
import React, { ReactNode, useCallback, useState } from "react";
import * as auth from '../auth-provider';
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { User } from "../screen/project-list/search-panel";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";
import * as authStore from '../store/auth.slice'
import { useDispatch, useSelector } from "react-redux";

export interface AuthForm {
    username: string,
    password: string
}
//初始化user
export const bootstrapUser = async () => { //刷新保持登陆状态
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

//用redux thunk改造了useAuth 后不需要这个//后面的了
// const AuthContext = React.createContext<{
//     user: User | null,
//     register: (form: AuthForm) => Promise<void>,
//     login: (form: AuthForm) => Promise<void>,
//     logout: () => Promise<void>,
// } | undefined>(undefined)
// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    //const [user, setUser] = useState<User | null>(null)
    const { 
        //data: user, 
        error, isLoading, 
        isIdle, isError,
        run, 
        //setData: setUser 
    } = useAsync<User | null>()
    // const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    // const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    // const logout = () => auth.logout().then(() => setUser(null))
    const dispatch:(...args:unknown[]) =>Promise<User> = useDispatch()

    useMount(() => {//刷新保持登陆状态
        run(dispatch(authStore.bootstrap()))
    })
    //初始或加载的时候
    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />
    }

    return <div>{children}</div> 
    //<AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const context = React.useContext(AuthContext)
    // if (!context) {
    //     throw new Error("useAuth必须在AuthProvider中使用");

    // }

    //  return context;
    //用redux thunk改造
    const dispatch:(...args:unknown[]) =>Promise<User> = useDispatch()
    const user = useSelector(authStore.selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)),
        [dispatch],
    )
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)),
        [dispatch],
    )
    const logout = useCallback(() => dispatch(authStore.logout()),
        [dispatch],
    )

    return {
        user,
        login,
        register,
        logout
    }
}