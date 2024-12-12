import { Admin } from "~/models/admin";
import axios from "axios";

export class AuthService {
  private baseURL = "http://localhost:3000/api/admin-auth";
  private refreshInterval: any;

  async register(admin: Admin) {
    try {
      const response = await axios.post(`${this.baseURL}/register`, admin);
      return response.data;
    } catch (error) {
      throw new Error("Error al registrar al administrador");
    }
  }

  async login(email: string, password: string, loginData?: { os: string, browser: string, isMobile: boolean }) {
    try {
      const response = await axios.post(
        `${this.baseURL}/login`,
        { email, password, ...loginData },
        { withCredentials: true }
      );

      console.log("Respuesta del login:", response.data);

      this.startTokenRefresh();
      return response.data;
    } catch (error) {
      console.error("Error en login:", error.message);
      throw new Error("Error al iniciar sesión");
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

      clearInterval(this.refreshInterval);

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
        method: "GET",
        credentials: "include", 
      });

      if (response.ok) {
        console.log("El access_token es válido.");
        return true; 
      } else if (response.status === 401) {
        console.log("El access_token expiró, intentando renovar...");
        await this.refreshAccessToken();
        return true; 
      } else {
        throw new Error("Error en la verificación del token");
      }
    } catch (error) {
      console.error("Error en la verificación del token:", error);
      return false; 
    }
  }

  private async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseURL}/verify-refreshtoken`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Refresh Token validado y access_token renovado:", data);
      } else {
        throw new Error("No se pudo refrescar el token");
      }
    } catch (error) {
      console.error("Error al refrescar el token", error);
      throw new Error("No se pudo refrescar el token, es necesario iniciar sesión nuevamente.");
    }
  }

  private startTokenRefresh() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);

    this.refreshInterval = setInterval(async () => {
      try {
        console.log("Renovando access_token antes de que expire...");
        await this.refreshAccessToken();
      } catch (error) {
        console.error("Error al renovar el token:", error);
        window.location.href = "/login"; 
      }
    }, 1200000); 
  }
}
