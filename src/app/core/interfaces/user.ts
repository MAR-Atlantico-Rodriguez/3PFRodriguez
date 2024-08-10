export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface User {
    id: Number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    token: string;
}