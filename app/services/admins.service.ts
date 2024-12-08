import { Admin } from "~/models/admin";

export class AdminService{
    private baseURL = "http://localhost:3000/api/admin-manage";

    async createAdmin(admin: Admin): Promise<Admin> {
        try {
          const response = await fetch(`${this.baseURL}/create`, {
            method: "POST",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(admin),
          });
      
          if (!response.ok) {
            throw new Error("Error al crear el administrador");
          }
          
          const newAdmin: Admin = await response.json();
          return newAdmin;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }


    async updateAdmin(admin: Admin): Promise<Admin> {
        try {
          const response = await fetch(`${this.baseURL}/update`, {
            method: "PUT",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(admin),
          });
      
          if (!response.ok) {
            throw new Error("Error al actualizar el administrador");
          }
          
          const updatedAdmin: Admin = await response.json();
          return updatedAdmin;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }

    async getAllAdmins(): Promise<Admin[]> {
        try {
          const response = await fetch(`${this.baseURL}/get-all`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información de los administradores");
          }
          
          const admins: Admin[] = await response.json();
          return admins;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }

    async getAdminById(id: string): Promise<Admin> {
        try {
          const response = await fetch(`${this.baseURL}/get-by-id/${id}`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información del administrador");
          }
          
          const admin: Admin = await response.json();
          return admin;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }

    async getAdminsByUsername(username: string): Promise<Admin[]> {
        try {
          const response = await fetch(`${this.baseURL}/get-by-username/${username}`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información del administrador");
          }
          
          const admins: Admin[] = await response.json();
          return admins;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }
    
  }