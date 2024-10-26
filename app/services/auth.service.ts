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



}