import { Route } from "~/models/route"; 

export class RouteService{
    private baseURL = "http://localhost:3000/api/admin-route"; 

    async createRoute(route: Route){
        try{
            const response = await fetch(`${this.baseURL}/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(route),
            });

            if (!response.ok){
                throw new Error("Error al crear la ruta");
            }

            const message = await response.json();
            return message;
        }catch(error){
            console.error("Error en la petición:", error);
        }
    }

    async getAllRoutes(){
        try{
            const response = await fetch(`${this.baseURL}/get-all`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok){
                throw new Error("Error al obtener las rutas");
            }

            const routes = await response.json();
            return routes;
        }catch(error){
            console.error("Error en la petición:", error);
        }
    }

    async getRouteByTitle(title: string){
        try{
            const response = await fetch(`${this.baseURL}/get-title/${title}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok){
                throw new Error("Error al obtener la ruta");
            }

            const route = await response.json();
            return route;
        }catch(error){
            console.error("Error en la petición:", error);
        }
    }

    
}