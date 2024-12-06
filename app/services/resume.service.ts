export class ResumeService{
    private baseURL = "http://localhost:3000/api/admin-resume";

    async accountsResume(): Promise<any> {
        try {
          const response = await fetch(`${this.baseURL}/accounts-created`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información de las cuentas");
          }
          
          const accountsResume = await response.json();
          return accountsResume;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }

    async teachersResume(): Promise<any> {
        try {
          const response = await fetch(`${this.baseURL}/teachers-created`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información de los profesores");
          }
          
          const teachersResume = await response.json();
          return teachersResume;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }

    async usersWithScholarshipResume(): Promise<any> { 
        try {
          const response = await fetch(`${this.baseURL}/users-with-scholarship`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información de los usuarios con beca");
          }
          
          const usersWithScholarshipResume = await response.json();
          return usersWithScholarshipResume;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }

    async usersSubscribedResume(): Promise<any> {
        try {
          const response = await fetch(`${this.baseURL}/users-subscribed`, {
            method: "GET",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la información de los usuarios suscritos");
          }
          
          const usersSubscribedResume = await response.json();
          return usersSubscribedResume;
        } catch (error) {
          console.error("Error en la petición:", error);
          throw error;
        }
    }
        
}