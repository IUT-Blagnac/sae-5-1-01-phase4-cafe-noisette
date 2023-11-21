import {User} from "./User";
import {Project} from "./Project";

export interface Team {
    id?: number;
    name: string;
    github: string;
    project: Project;
    members: User[];
    leader: User;
}