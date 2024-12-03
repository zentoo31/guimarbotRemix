import { Session } from "~/models/session";

export class SessionService{
    private baseURL = "http://localhost:3000/api/admin-session";

    async createSession(session: Session){
        try{
            const response = await fetch(`${this.baseURL}/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(session),
            });

            if (!response.ok){
                throw new Error("Error al crear la sesión");
            }

            const message = await response.json();
            return message;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async updateSession(session: Session){
        try{
            const response = await fetch(`${this.baseURL}/update/${session._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(session),
            });

            if (!response.ok){
                throw new Error("Error al actualizar la sesión");
            }

            const message = await response.json();
            return message;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getSessionById(session_id: string){
        try{
            const response = await fetch(`${this.baseURL}/get-session/${session_id}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok){
                throw new Error("Error al obtener la sesión");
            }

            const session: Session = await response.json();
            return session;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getSessionsByIdSection(section_id: string){
        try{
            const response = await fetch(`${this.baseURL}/get-sessions/${section_id}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok){
                throw new Error("Error al obtener las sesiones");
            }

            const sessions: Session[] = await response.json();
            return sessions;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getAllSessionsBySubject(subject_id: string){
        try{
            const response = await fetch(`${this.baseURL}/get-sessions-subject/${subject_id}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok){
                throw new Error("Error al obtener las sesiones");
            }

            const sessions: Session[] = await response.json();
            return sessions;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

}