import {User} from "../models/User";
import {post} from "./restUtils";

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