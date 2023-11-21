import {PlayerInfo} from "./PlayerInfo";
import {UserType} from "./UserType";

export interface User {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    playerInfo?: PlayerInfo;
    password: string | null; // only on creation
    roles: UserType[];
}