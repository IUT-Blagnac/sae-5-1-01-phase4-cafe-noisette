import {User} from "../models/User";
import {get, post} from "./restUtils";

export const createAccount = async (account: User) => {
    return await post<User, User>('users', account);
}

export const login = async (username: string, password: string) => {
    return await post<{username: string, password: string}, {token: string}>('auth/login', {username, password});

}

export const getUserById = async (id: string) => {
    return await get<User>('users?id=' + id, true);
}

export const getUserByUsername = async (username: string) => {
    return await get<User>('users?username=' + username, true);
}