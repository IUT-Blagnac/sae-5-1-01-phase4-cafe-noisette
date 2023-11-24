import {User} from "../models/User";
import {get, post} from "./restUtils";

export const createAccount = async (account: User) => {
    const response = await post('users', account);
    const json = await response.json() as User;
    return {response, json}
}

export const login = async (username: string, password: string) => {
    const response = await post('auth/login', {username, password});
    if (!response.ok) {
        return {response, json: null}
    }
    const json = await response.json() as {token: string};
    return {response, json}
}

export const getUserById = async (id: string) => {
    const response = await get('users?id=' + id, true);
    const json = await response.json() as User;
    return {response, json}
}

export const getUserByUsername = async (username: string) => {
    const response = await get('users?username=' + username, true);
    const json = await response.json() as User;
    return {response, json}
}