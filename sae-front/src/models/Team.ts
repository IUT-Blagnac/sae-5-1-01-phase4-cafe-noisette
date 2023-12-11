import {User} from "./User";
import {Project} from "./Project";

export interface Team {
    id?: number;
    name: string;
    github: string;
    projectId: number;
    membersId: number[];
    leaderId: number;
}