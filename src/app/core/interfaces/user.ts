export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface User {
    id: Number;
    name: String;
    email: String;
    password: String;
    role: UserRole;
}