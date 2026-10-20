export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export type newUser = Omit<User, "id">;