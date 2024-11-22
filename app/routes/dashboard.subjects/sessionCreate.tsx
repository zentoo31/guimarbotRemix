import {Card, Label, Select, TextInput, FileInput, Textarea } from "flowbite-react"
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { SectionService } from "~/services/section.service";
import { Section } from "~/models/section";
import { SessionService } from "~/services/session.service";

function SessionCreate() {
  const sectionService = new SectionService();
  const sessionService = new SessionService();
  const [titleSection, setTitleSection] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [video, setVideo] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]); 
  const [titleSession, setTitleSession] = useState("");
  const [description, setDescription] = useState("");

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    console.log("Sección seleccionada:", event.target.value); // Verifica que se guarde correctamente
  };

  const extractVideoId = (url: string) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideo(url);
    const id = extractVideoId(url);
    setVideoId(id || null); 
  };

  const saveSection = async () => {
    if (!titleSection || !subject_id) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newSection = {
      _id: "", 
      title: titleSection,
      subject_id: subject_id,
    };
    try {
      const message = await sectionService.createSection(newSection);
      console.log("Sección creada con éxito:", message);
      alert("Sección creada con éxito");
    } catch (error) {
      console.error("Error al crear la sección:", error);
      alert("Hubo un error al crear la sección.");
    }
  }

  const loadSections = async () => {
    try {
      const sections = await sectionService.getSectionsBySubject(subject_id);
      setSections(sections);
    } catch (error) {
      alert("Hubo un error al obtener las secciones.");
    }
  }

  const saveSession = async () => {
    if (!titleSession || !description || !selectedSection) {
      let errorMessage = "Por favor, completa todos los campos obligatorios.\n";
  
      if (!titleSession) {
        errorMessage += "- El título de la sesión es obligatorio.\n";
      }
  
      if (!description) {
        errorMessage += "- La descripción de la sesión es obligatoria.\n";
      }
  
      if (!selectedSection) {
        errorMessage += "- Debes seleccionar una sección.\n";
      }
  
      alert(errorMessage);
      return;
    }
  

    try {
      const newSession = {
        _id: "",
        title: titleSession,
       description,
        video: video || "",
        section_id: selectedSection ,
      };
      const message = await sessionService.createSession(newSession);
      console.log("Sesión creada con éxito:", message);
      alert("Sesión creada con éxito");
    } catch (error) {
      console.error("Error al crear la sesión:", error);
      alert("Hubo un error al crear la sesión.");
    }
  }


  useEffect(() => {
    if (subject_id) { 
      loadSections();
    }
  }, [subject_id]);

  return (
    <div className="w-full p-10 flex flex-row gap-2">
        <Card className="flex flex-col items-center text-start justify-between w-1/4">
                <h1 className="font-bold text-xl text-start">Curso</h1>
                <TextInput placeholder="cursos" className="w-full" onChange={(e) => setSubject_id(e.target.value)}/>
                <Button color="primary" className="w-full">Buscar</Button>
                <h1 className="font-bold text-xl text-start">Registrar Sección</h1>
                <div className="flex flex-col gap-2 justify-start items-start">
                    <Label>Nombre de la sección</Label>
                    <TextInput placeholder="Nombre"  className="w-full" onChange={(e) => setTitleSection(e.target.value)}/>
                </div>
                <div className="flex flex-col w-full gap-2">
                    <Button color="primary" className="w-full" onClick={saveSection}>Crear</Button>
                </div>

                <h1 className="font-bold text-xl text-start">Selección de sección</h1>
                <Select 
                  className="w-full" 
                  value={selectedSection || ""} 
                  onChange={(e) => {
                    setSelectedSection(e.target.value);
                    console.log("Sección seleccionada:", e.target.value);
                  }}
                >
                  {sections && sections.length > 0 ? (
                    sections.map((section) => (
                      <option key={section._id} value={section._id}>
                        {section.title}
                      </option>
                    ))
                  ) : (
                    <option disabled value="">
                      Cargando secciones...
                    </option>
                  )}
                </Select>
            </Card>
            <Card className="flex flex-col w-3/4 overflow-y-scroll">
                <h1 className="font-bold text-xl text-start">Registrar sesión</h1>
                <div className="flex flex-col gap-2 justify-start items-start">
                    <Label>Nombre de la sesión</Label>
                    <TextInput placeholder="Nombre"  className="w-full" onChange={(e) => setTitleSession(e.target.value)} />
                    <Label>Descripción</Label>
                    <Textarea placeholder="Descripción"  className="w-full" onChange={(e) => setDescription(e.target.value)} />
                    <Label>Video</Label>
                    <FileInput className="w-full"/>
                    <TextInput className="w-full" placeholder="https://youtube.com/watch=?1238213" onChange={handleVideoChange}></TextInput>
                    <Label>Previsualización</Label>
                    <iframe className="rounded"  width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
                <div className="flex flex-row w-full gap-2">
                    <Button color="primary" className="w-1/2" onClick={saveSession}>Crear</Button>
                    <Button color="primary" variant="bordered" className="w-1/2">Cancelar</Button>
                </div>
            </Card>
    </div>
  )
}

export default SessionCreate
