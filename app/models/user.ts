export interface User {
    _id: string; 
    username: string;
    first_name: string; 
    last_name: string; 
    birthdate?: string; 
    role?: string; 
    email: string; 
    password?: string;
    profile_picture?: string; 
    scholarship?: boolean; 
    creation_date?: string;
    subscription?: string[];
}