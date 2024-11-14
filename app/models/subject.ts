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
    created_at: string;
}