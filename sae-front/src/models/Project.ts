import {User} from "./User";

export interface Project {
    id?: number;
    name: string;
    description: string;
    clientIds: number[];
}

export function getUsersFromIds(users: User[], ids: number[]): User[] {
    return users.filter(user => ids.includes(user.id!));
}