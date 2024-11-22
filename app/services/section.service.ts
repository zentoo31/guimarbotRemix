import { Section } from "~/models/section";

export class SectionService{
    private baseURL = "http://localhost:3000/api/admin-section";

    async createSection(section: Section){
        try{
            const response = await fetch(`${this.baseURL}/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(section),
            });

            if (!response.ok){
                throw new Error("Error al crear la sección");
            }

            const message = await response.json();
            return message;
        }catch(error){
            console.error("Error en la petición:", error);
        }
    }

    async updateSection(section: Section){
        try{
            const response = await fetch(`${this.baseURL}/update/${section._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(section),
            });

            if (!response.ok){
                throw new Error("Error al actualizar la sección");
            }

            const message = await response.json();
            return message;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }

    async getSectionsBySubject(subject_id: string){
        try{
            const response = await fetch(`${this.baseURL}/get/${subject_id}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok){
                throw new Error("Error al obtener las secciones");
            }

            const sections: Section[] = await response.json();
            return sections;
        }catch(error){
            console.error("Error en la petición:", error);
            throw error;
        }
    }
    
}