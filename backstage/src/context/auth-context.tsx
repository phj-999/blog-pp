
import React, { ReactNode, useState } from "react";
import * as auth from '../auth-provider';
import { User } from "../screen/project-list/search-panel";
import { useMount } from "../utils";
import { http } from "../utils/http";

interface AuthForm {
    username: string,
    password: string
}
//初始化user
const bootstrapUser = async () => { //刷新保持登陆状态
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {//刷新保持登陆状态
        bootstrapUser().then(setUser)
    })

    return <AuthContext.Provider value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");

    }
    return context;
}