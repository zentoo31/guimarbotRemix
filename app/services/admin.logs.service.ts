import { AuthLog } from "~/models/authLog";

export class AdminLogsService{
    private baseURL = "http://localhost:3000/api/admin-auth-logs";
    
    async getAllAuthLogs(): Promise<AuthLog[]>{
        try{
            const response = await fetch(`${this.baseURL}/get-all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Error al obtener los logs de autenticación");
            }
            const authLogs: AuthLog[] = await response.json();
            return authLogs;
        }catch(error){
            throw new Error("Error al obtener los logs de autenticación");
        }
    }


    async getAuthLogsByAdminId(adminId: string){
        try{
            const response = await fetch(`${this.baseURL}/get-by-admin-id/${adminId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Error al obtener los logs de autenticación");
            }
            return await response.json();
        }catch(error){
            throw new Error("Error al obtener los logs de autenticación");
        }
    } 

    async getAuthLogsByUsername(username: string):Promise<AuthLog[]>{
        try{
            const response = await fetch(`${this.baseURL}/get-by-admin-username/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Error al obtener los logs de autenticación");
            }
            const authLogs: AuthLog[] = await response.json();
            return authLogs;
        }catch(error){
            throw new Error("Error al obtener los logs de autenticación");
        }
    }

}