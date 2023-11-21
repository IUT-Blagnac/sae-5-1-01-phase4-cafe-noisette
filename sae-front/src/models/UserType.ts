export enum UserType {
    TEACHER,
    STUDENT_INIT,
    STUDENT_ALT,
    CONTACT,
    ADMIN,
}

export const getUserTypeByString = (userType: string): UserType => {
    switch (userType) {
        case 'TEACHER':
            return UserType.TEACHER;
        case 'STUDENT_INIT':
            return UserType.STUDENT_INIT;
        case 'STUDENT_ALT':
            return UserType.STUDENT_ALT;
        case 'CONTACT':
            return UserType.CONTACT;
        case 'ADMIN':
            return UserType.ADMIN;
        default:
            throw new Error('Unknown user type');
    }
}