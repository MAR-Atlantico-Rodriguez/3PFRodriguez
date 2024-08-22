export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface User {
    id: Number | string;
    name: string;
    firstName: String;
    lastName: String;
    email: string;
    password: string;
    role: UserRole;
    token: string;
}

export interface UserLogin {
    token: string;
    role: UserRole;
    username: string;
}