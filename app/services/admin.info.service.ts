import { Admin } from "~/models/admin";

export class AdminInfoService{
    private baseURL = "http://localhost:3000/api/admin";

    async getAdminHeaderInfo(): Promise<Admin> {
        try {
          const response = await fetch(`${this.baseURL}/get-headers`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información del header");
          }
          
          const admin: Admin = await response.json();
          return admin;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }

  


}