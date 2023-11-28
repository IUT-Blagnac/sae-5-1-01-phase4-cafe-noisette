import {PlayerInfo} from "./PlayerInfo";

export interface User {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    playerInfo?: PlayerInfo;
    password: string | null; // only on creation
    roles: string[];
}

// Roles :
//     ADMIN,
//     TEACHER,
//     STUDENT_INIT,
//     STUDENT_ALT,
//     CONTACT