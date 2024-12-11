import { Card, TextInput, Textarea, Label } from "flowbite-react";
import { useState } from "react";
import SearchBar from "./searchBar";
import { Button } from "@nextui-org/react"
import { RouteService } from "~/services/route.service";
import { toast } from "react-toastify";

function RouteCreate() {
  const routeService = new RouteService();
  const [numSearchBars, setNumSearchBars] = useState(0); // Número inicial de SearchBars
  const [subjects, setSubjects] = useState<string[]>([]); // Array para almacenar valores seleccionados
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");


  const handleSelection = (index: number, value: string | null) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value || ""; // Actualiza el índice correspondiente con el valor seleccionado
    setSubjects(updatedSubjects);
    console.log("Subjects actualizados:", updatedSubjects);
  };

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num > 0) {
      setNumSearchBars(num);
      setSubjects(new Array(num).fill("")); // Reinicia el array con el nuevo tamaño
    }
  };

  const saveRoute = async () => {
    const filteredSubjects = subjects.filter((subject) => subject !== "");
    const route = {
      title,
      description,
      icon,
      subjects: filteredSubjects,
    };

    console.log("Ruta a guardar:", route);

    try {
       await routeService.createRoute(route);
      toast.success("Ruta creada con éxito");
    } catch (error) {
      console.error("Error al guardar la ruta:", error);
      toast.error("Error al guardar la ruta");
    }
  };

  return (
    <div className="w-full p-10 flex flex-col gap-4">
      <Card>
        <h1 className="font-bold text-xl text-start mb-4">Cursos a añadir</h1>
        <div className="mb-6">
          <Label>Título de la ruta</Label>
          <TextInput placeholder="Nombre" onChange={(e) => {setTitle(e.target.value)}} />
          <Label>Descripción de la ruta</Label>
          <Textarea placeholder="Descripción" onChange={(e) => {setDescription(e.target.value)}} />
          <Label>Url del ícono</Label>
          <TextInput placeholder="URL" onChange={(e) => {setIcon(e.target.value)}} />
          <Label htmlFor="numCourses" className="mb-2">
            Número de cursos a añadir:
          </Label>
          <TextInput placeholder="Nombre" type="number"  value={numSearchBars}
            onChange={handleNumChange}/>
        </div>
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: numSearchBars }, (_, index) => (
            <SearchBar
              key={index}
              onSelect={(value) => handleSelection(index, value)}
            />
          ))}
        </div>
        <div className="flex flex-row w-full gap-2 items-center justify-center">
            <Button color="primary" className="w-1/2" onClick={saveRoute}>Crear</Button>
        </div>      
      </Card>
    </div>
  );
}

export default RouteCreate;
