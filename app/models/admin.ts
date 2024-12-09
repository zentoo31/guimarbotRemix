export interface Admin{
    _id?: string;   
    username: string;
    email: string;
    password: string;
    role?: string;
    first_name: string;
    last_name: string;
    profile_picture?: string;
    last_login?: {
        date:string;
    };
}