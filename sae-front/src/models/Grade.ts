import { User, UserRole } from "./User";
import { Project } from "./Project";

export interface Grade {
    id?: number;
    title: string;
    description: string;
    grade: number;
    coefficient: number;
    type: string;
    teamId: number;
}