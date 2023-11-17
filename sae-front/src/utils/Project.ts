import {User} from "./User";

export interface Project {
    id: number;
    name: string;
    description: string;
    contact: User | null;
}