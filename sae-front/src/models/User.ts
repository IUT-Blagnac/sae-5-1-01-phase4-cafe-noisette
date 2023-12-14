import { PlayerInfo } from "./PlayerInfo";

export interface User {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    playerInfo?: PlayerInfo;
    password: string | null; // only on creation
    roles: UserRole[];
    teamId: number | null;
}

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT_INIT' | 'STUDENT_ALT' | 'CLIENT' | '';


// Roles :
//     ADMIN,
//     TEACHER,
//     STUDENT_INIT,
//     STUDENT_ALT,
//     CONTACT