import { Admin } from "~/models/admin";
import axios from "axios";

export class AuthService{
    private baseURL = "http://localhost:3000/api/admin-auth";

    async register (admin: Admin){
        try{
            const response = await axios.post(`${this.baseURL}/register`, admin);
            return response.data;
        }catch(error){
            throw new Error("Error al registrar al administrador");
        }
    }

    async login(email: string, password: string, loginData: { os: string, browser: string, isMobile: boolean}) {
      try{
            const response = await axios.post(`${this.baseURL}/login`,{ email, password, ...loginData },{withCredentials: true});
            return response.data;
        }catch(error){
            throw new Error("Error al iniciar sesion");
        }
    }

    async logout(): Promise<void> {
        try {
          const response = await fetch(`${this.baseURL}/logout`, {
            method: "POST",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al cerrar la sesión");
          }
      
          const result = await response.json();
          console.log("Sesión cerrada:", result);
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
      }

    async isAuth(){
        try {
            const response = await axios.get(`${this.baseURL}/verify-token`, {withCredentials: true});
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    }


}