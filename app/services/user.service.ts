import { User } from "~/models/user";

export class UserService{
    private baseURL = "http://localhost:3000/api/admin-user-manage";

    async getUsers(): Promise<User[]>{
        try{
            const response = await fetch(`${this.baseURL}/get-all`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                throw new Error("Error al obtener los usuarios");
            }

            const users: User[] = await response.json();
            return users;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getUserById(id: string): Promise<User>{
        try{
            const response = await fetch(`${this.baseURL}/get-by-id/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                throw new Error("Error al obtener el usuario");
            }

            const user: User = await response.json();
            return user;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getUserByUsername(username: string): Promise<User[]>{
        try{
            const response = await fetch(`${this.baseURL}/get-by-username/${username}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                throw new Error("Error al obtener el usuario");
            }

            const user: User[] = await response.json();
            return user;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }
}