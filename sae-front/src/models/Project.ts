import {User} from "./User";

export interface Project {
    id?: number;
    name: string;
    description: string;
    clientIds: number[];
}

export function getProjectClients(project: Project, users: User[]) : User[] {
    return users.filter(user => project.clientIds.includes(user.id!));
}