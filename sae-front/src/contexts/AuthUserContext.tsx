import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {User} from "../models/User";
import {getMe} from "../rest/queries";

export interface AuthUser {
    token: string | undefined;
    user?: User | undefined;
    updateToken: (token: string) => void;
    refreshUser: () => void;
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

    const refreshUser = useCallback(() => {
        if (token) {
            getMe().then((response) => {
                    if (response.responseCode === 200) {
                        if (response.data) {
                            setUser(response.data);
                        }
                    } else {
                        console.log("Error while logging in: " + response.errorMessage);
                    }
                }
            );
        }
    }, [token]);

    const disconnect = () => {
        setToken(undefined);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        if (token) {
            refreshUser();
        }
    }, [token, refreshUser]);

    return {token, user, updateToken, refreshUser, disconnect} as AuthUser;
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