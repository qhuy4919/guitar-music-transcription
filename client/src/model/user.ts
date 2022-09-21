export type UserAuthentication = {
    _id?: string;
    user?: string;
    roles?: string;
    accessToken?: string;
    pwd?: string;
}

export type UserContext = {
    auth: UserAuthentication,
    setAuth: React.Dispatch<React.SetStateAction<UserAuthentication>>
}