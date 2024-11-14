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
}