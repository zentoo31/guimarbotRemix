import { Admin } from "~/models/admin";
import axios from "axios";

export class AuthService {
  private baseURL = "http://localhost:3000/api/admin-auth";

  async register(admin: Admin) {
    try {
      const response = await axios.post(`${this.baseURL}/register`, admin);
      return response.data;
    } catch (error) {
      throw new Error("Error al registrar al administrador");
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this.baseURL}/login`, { email, password }, { withCredentials: true });
      console.log('Respuesta del login:', response.data);
      return response.data;
    } catch (error) {
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

  async isAuth() {
    try {
      const response = await fetch(`${this.baseURL}/verify-token`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        return data;  // Si la respuesta es válida, devolver los datos
      } else {
        // Si el token es inválido, intentar refrescar el token
        return await this.refreshAccessToken();
      }
    } catch (error) {
      console.log("Error en la verificación del token:", error);
      return false;  // Si hay algún error, retornar false (sesión no autenticada)
    }
  }

  private async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseURL}/verify-refreshtoken`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Refresh Token validado:', data);
      } else {
        throw new Error("No se pudo refrescar el token");
      }
    } catch (error) {
      console.error("Error al refrescar el token", error);
      throw new Error("No se pudo refrescar el token, es necesario iniciar sesión nuevamente.");
    }
  }

}