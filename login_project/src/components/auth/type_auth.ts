export interface IUser{
    user?: string
    email?: string
    password?: string
    con_password?: string
    token?: string
}

export interface IContext extends IUser{
    Authenticate: (email: string, password: string) => Promise<void>
    Register: (account: ObjectConstructor) => Promise<void>
    Logout: () => void
}

export interface IAuthProvider{
    children: JSX.Element
}