export interface Subject{
    _id:string;
    title: string;
    image: string;
    banner: string;
    description: string;
    author: string;
    rate: number;
    level: string;
    hours: number;
    price: number;
    tags: string[];
    is_active: boolean;
    created_at: string;
}