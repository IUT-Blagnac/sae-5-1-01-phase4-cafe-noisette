import {User} from "../models/User";
import {get, post} from "./restUtils";
import {Project} from "../models/Project";

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

export const getMe = async () => {
    return await get<User>('users/me', true);
}

export const getProjects = async () => {
    return await get<Project[]>('projects', true);
}

export const postProject = async (project: Project) => {
    return await post<Project, Project>('projects', project);
}