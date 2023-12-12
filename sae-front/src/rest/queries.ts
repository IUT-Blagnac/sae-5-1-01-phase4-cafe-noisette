import { User } from "../models/User";
import { get, post, put } from "./restUtils";
import { Project } from "../models/Project";
import { Team } from "../models/Team";

export const createAccount = async (account: User) => {
    return await post<User, User>('users', account);
}

export const login = async (username: string, password: string) => {
    return await post<{ username: string, password: string }, { token: string }>('auth/login', { username, password });
}

export const getUserById = async (id: string) => {
    return await get<User>('users?id=' + id, true);
}

export const getUserByUsername = async (username: string) => {
    return await get<User>('users?username=' + username, true);
}

export const getClients = async () => {
    return await get<User[]>('users/clients/filter', true);

}

export const getMe = async () => {
    return await get<User>('users/me', true);
}

export const getProjects = async () => {
    return await get<Project[]>('projects', true);
}

export const postProject = async (project: Project) => {
    return await post<Project, Project>('projects', project, true);
}

export const putProject = async (project: Project) => {
    return await put<Project, Project>('projects', project, true);
}

export const getStudents = async () => {
    return await get<User[]>('users/students/filter', true);
}

export const getTeams = async () => {
    return await get<Team[]>('teams/filter', true);
}

export const getStudentsByUsername = async (username: String) => {
    return await get<User[]>('users/students/filter?username=' + username, true);
}

export const addMemberTeam = async (user: User, teamId: number) => {
    return await put<User, Team>('teams/' + teamId + "/addMember", user, true);
}

export const getTeamsWithTeamId = async (teamId: number) => {
    return await get<Team[]>('teams/filter?id=' + teamId, true);
}

export const postTeam = async (team: Team) => {
    return await post<Team, Team>('teams', team, true);
}