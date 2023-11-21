import {createContext, ReactNode, useContext, useState} from "react";
import {User} from "../models/User";

export interface AuthUser {
    token: string | undefined;
    user?: User | undefined;
    updateToken: (token: string) => void;
    updateUser: (user: User) => void;
    disconnect: () => void;
}

const useAuthUserValues = () => {
    const localStorageToken = localStorage.getItem("token");
    const [token, setToken] = useState(localStorageToken ? localStorageToken : undefined);
    const [user, setUser] = useState<User | undefined>(undefined);

    const updateToken = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    const updateUser = (user: User) => {
        setUser(user);
    }

    const disconnect = () => {
        setToken(undefined);
        localStorage.removeItem("token");
    }

    return {token, user, updateToken, updateUser, disconnect} as AuthUser;
}

export const AuthUserContext = createContext<AuthUser | null>(null)

export const AuthUserProvider = (props: {children: ReactNode}) => {
    const authUser = useAuthUserValues();

    return (
        <AuthUserContext.Provider value={authUser}>
            {props.children}
        </AuthUserContext.Provider>
    )
}

export const useAuthUser = () => {
    const authUser = useContext(AuthUserContext);
    if (!authUser) {
        throw new Error("You probably forgot to put <AuthUserProvider>.");
    }
    return authUser;
}