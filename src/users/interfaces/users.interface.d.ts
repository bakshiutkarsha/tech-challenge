export interface User {
    password: string;
    user_id: number;
    name: string;
    email: string;
    address: Address;
    phone: string;
}

export interface Address{
    street: string;
    suite: string;
    city: string;
}

export interface UserLoginRequest {
    username: string;
    password: string;
}