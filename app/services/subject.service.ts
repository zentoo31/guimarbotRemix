import { Subject } from "~/models/subject";

export class SubjectService{
    private baseURL = "http://localhost:3000/api/admin-subject";

    async getSubjects(): Promise<Subject[]>{
        try{
            const response = await fetch(`${this.baseURL}/get-all`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                throw new Error("Error al obtener las materias");
            }

            const subjects: Subject[] = await response.json();
            return subjects;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getSubjectById(id: string): Promise<Subject>{
        try{
            const response = await fetch(`${this.baseURL}/get-id/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                throw new Error("Error al obtener la materia");
            }

            const subject: Subject = await response.json();
            return subject;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getSubjectsByTitle(title: string): Promise<Subject[]>{
        try{
            const response = await fetch(`${this.baseURL}/get-title/${title}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                throw new Error("Error al obtener la materia");
            }

            const subject: Subject[] = await response.json();
            return subject;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async createSubject(subject: Subject){
        try{
            const response = await fetch(`${this.baseURL}/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subject),
            });

            if (!response.ok){
                const errorData = await response.json();  
                throw new Error(errorData.message || "Error al crear la materia");
            }

            const data = await response.json();
            return data.message;  
            
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async updateSubject(subject: Subject){
        try{
            const response = await fetch(`${this.baseURL}/update/${subject._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subject),
            });

            if (!response.ok){
                const errorData = await response.json();  
                throw new Error(errorData.message || "Error al actualizar la materia");
            }

            const data = await response.json();
            return data.message;  
            
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async disableSubject(id: string){
        try{
            const response = await fetch(`${this.baseURL}/disable/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                const errorData = await response.json();  
                throw new Error(errorData.message || "Error al deshabilitar la materia");
            }

            const data = await response.json();
            return data.message;  
            
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async enableSubject(id: string){
        try{
            const response = await fetch(`${this.baseURL}/enable/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok){
                const errorData = await response.json();  
                throw new Error(errorData.message || "Error al habilitar la materia");
            }

            const data = await response.json();
            return data.message;  
            
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

}