import {Card, Label, Select, TextInput, Textarea } from "flowbite-react"
import { Subject } from "~/models/subject"
import { SubjectService } from "~/services/subject.service"
import UploadWidget from "./uploadWidget"
import { useState } from "react"
import { Button } from "@nextui-org/react"

function SubjectCreate() {
  const subjectService = new SubjectService();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Facil");
  const [hours, setHours] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<string[]>([]); 
  const [image, setImage] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const handleUploadSuccessImage = (uploadedUrl: string) => {
    setImage(uploadedUrl);
  };

  const handleUploadSuccessBanner = (uploadedUrl: string) => {
    setBanner(uploadedUrl);
  };


  const handleSave = async () => {
    if (!title || !author || !description || !hours || !price || !image || !banner) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newSubject: Subject = {
      _id: "", 
      created_at: new Date().toISOString(),
      is_active: true,
      title,
      author,
      description,
      image,
      banner,
      level,
      hours,
      price,
      rate: 0, 
      tags,
    };
    try {
      const message = await subjectService.createSubject(newSubject);
      console.log("Curso creado con éxito:", message);
      alert("Curso creado con éxito");
    } catch (error) {
      console.error("Error al crear el curso:", error);
      alert("Hubo un error al crear el curso.");
    }
  };

  return (
        <div className="flex flex-row w-full">
            <Card className="flex flex-col items-center text-center justify-between w-full h-[100vh]">
              <div className="w-full flex flex-col gap-4">
              <h1 className="font-bold text-xl text-start">Registrar curso</h1>
                <div className="w-full flex flex-row justify-between gap-5 items-center"> 
                  <img src={image ?? "https://placehold.co/600x400"} alt="" className="w-60 h-40"/>
                  
                  <div className="w-full flex flex-col gap-5">
                    <UploadWidget folder="images_subject" preset = "image_subject" label = "Subir portada" formats={['png', 'jpeg', 'jpg', 'webp']} onUploadSuccess={handleUploadSuccessImage}/>
                    <UploadWidget folder="banner_subject" preset = "banner_subject" label = "Subir banner" formats={['png', 'jpeg', 'jpg', 'webp']} onUploadSuccess={handleUploadSuccessBanner}/>
                  </div>
                </div>
                  <h1 className="text-base">Información del Curso</h1>
                  <div className="flex flex-col text-start items-start gap-2 ">
                        
                      <Label>Nombre o Titulo</Label>
                      <TextInput placeholder="Titulo"  className="w-full" value={title} onChange={(e) => setTitle(e.target.value)}/>
                      <Label>Autor o docente</Label>
                      <TextInput placeholder="Autor" className="w-full" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                      <Label>Descripcion</Label>
                      <Textarea placeholder="Descripción..." className="w-full" value={description} onChange={(e) => setDescription(e.target.value)}/>
                      <Label>Nivel</Label>
                      <div className="w-full">
                          <Select value={level} onChange={(e) => setLevel(e.target.value)}>
                            <option>Facil</option>
                            <option>Avanzado</option>
                            <option>Medio</option>
                          </Select> 
                      </div> 
                     <div className="flex flex-row gap-5 w-full">
                      <div className="flex flex-col gap-2 w-1/2">
                        <Label>Horas</Label>
                        <TextInput placeholder="00" type="number"  value={hours || ""} className="w-full" onChange={(e) => setHours(Number(e.target.value))}/>
                      </div>
                      <div className="flex flex-col gap-2 w-1/2">
                        <Label>Precio</Label>
                        <TextInput placeholder="0.00" type="number" value={price || ""} className="w-full" onChange={(e) => setPrice(Number(e.target.value))}/>
                      </div>
                     </div>
                  </div>
                  
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row w-full gap-2">
                    <Button color="primary" className="w-1/2" onClick={handleSave}>Guardar</Button>
                    <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
                  </div>
                </div>
            </Card>
        </div>
      )
}

export default SubjectCreate
