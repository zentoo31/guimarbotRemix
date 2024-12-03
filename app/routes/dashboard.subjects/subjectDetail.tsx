/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, TextInput, Label, Table, Select, FileInput, Textarea } from "flowbite-react"
import { Button, Image, Chip } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { SubjectService } from "~/services/subject.service";
import { SessionService } from "~/services/session.service";
import { Subject } from "~/models/subject";
import { Session } from "~/models/session";
import UploadWidget from "./uploadWidget";

interface subjectDetailProps{
  subjectId: string;
}

function SubjectDetail({subjectId}: subjectDetailProps) {  
  const subjectService = new SubjectService();
  const sessionService = new SessionService();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Facil");
  const [hours, setHours] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]); 
  const [banner, setBanner] = useState<string | null>(null);
  const levels = ["Facil", "Avanzado", "Medio"];

  const handleUploadSuccessImage = (uploadedUrl: string) => {
    setImage(uploadedUrl);
  };

  const loadSubject =  async () => {
    try {
      const subject = await subjectService.getSubjectById(subjectId);
      setSubject(subject);
      setTitle(subject.title );
      setAuthor(subject.author );
      setDescription(subject.description );
      setLevel(subject.level );
      setHours(subject.hours );
      setPrice(subject.price );
      setImage(subject.image);
      setBanner(subject.banner );
    } catch (error) {
      console.error("Error al cargar el curso:", error);
    }
  }

  const disableSubject = async  () => {
    try {
      const message = await subjectService.disableSubject(subjectId);
      alert("Curso desactivado con éxito");
      loadSubject();
    } catch (error) {
      alert("Hubo un error al desactivar el curso.");
    }
  }

  const enableSubject = async () => {
    try {
      const message = await subjectService.enableSubject(subjectId);
      alert("Curso activado con éxito");
      loadSubject();
    } catch (error) {
      alert("Hubo un error al activar el curso.");
    }
  }

  const handleSave = async () => {
    if (!title || !author || !description || !hours || !price || !image) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newSubject: Subject = {
      _id: subject?._id ?? "", 
      created_at: subject?.created_at ?? new Date().toISOString(),
      is_active: subject?.is_active ?? true,
      title,
      author,
      description,
      image,
      banner: subject?.banner ?? "",
      level,
      hours,
      price,
      rate: subject?.rate ?? 0, 
      tags: subject?.tags ?? [],
    };
    try {
      const message = await subjectService.updateSubject(newSubject);
      console.log("Curso actualizado con éxito:", message);
      alert("Curso actualizado con éxito");
      loadSubject();
    } catch (error) {
      console.error("Error al crear el curso:", error);
      alert("Hubo un error al crear el curso.");
    }
  }

  const loadSessions = async () => {
    try {
      const sessions = await sessionService.getAllSessionsBySubject(subjectId);
      setSessions(sessions);
    } catch (error) {
      console.error("Error al cargar las sesiones:", error);
    }
  }
  
  useEffect(() => {
    loadSubject();
    loadSessions();
  }, [])

  return (
    <div className="w-full p-10 flex flex-row gap-2">
        <Card className="flex flex-col items-center text-center justify-between w-1/4">
          <div>
              <div className="flex flex-col items-start">
              {subject?.is_active ? 
                (<Chip variant="dot" color="success">Activado</Chip>)
                : ( <Chip color="danger" variant="dot">Desactivado</Chip>)
              }
              </div>
              <div className="relative w-full flex flex-row items-center justify-center">
                  <Image
                    src={
                      subject?.image 
                    }
                    width={250}
                    height={160}
                    className="rounded-md relative" 
                  />
                  <div className="absolute z-50 top-2 right-2">
                    <UploadWidget folder="images_subject" preset = "image_subject" label = "Cambiar" formats={['png', 'jpeg', 'jpg', 'webp']} onUploadSuccess={handleUploadSuccessImage}/>
                  </div>
              </div>
              <h1 className="font-bold text-xl">Información del curso</h1>
              <div className="flex flex-col text-start items-start gap-2 w-full">
                  <Label>Nombre o titulo</Label>
                  <TextInput placeholder="Titulo" defaultValue={subject?.title} className="w-full"  onChange={(e) => setTitle(e.target.value)} />
                  <Label>Autor o docente</Label>
                  <TextInput placeholder="Autor" defaultValue={subject?.author} className="w-full" onChange={(e) => setAuthor(e.target.value)}/>
                  <Label>Descripción</Label>
                  <Textarea placeholder="description" defaultValue={subject?.description} className="w-full"  onChange={(e) => setDescription(e.target.value)}/>
                  <Label>Nivel</Label>
                  <Select className="w-full" onChange={(e) => setLevel(e.target.value)}>
                    <option>{subject?.level}</option>
                    {levels.filter((level) => level !== subject?.level) 
                      .map((level) => (
                        <option key={level} defaultValue={level}>
                          {level}
                        </option>
                      ))}
                  </Select>
                  <Label>Horas</Label>
                  <TextInput placeholder="Horas" defaultValue={subject?.hours} className="w-full" type="number" onChange={(e) => setHours(Number(e.target.value))} />
                  <Label>Precio</Label>
                  <TextInput placeholder="precio" defaultValue={subject?.price} className="w-full" type="number" onChange={(e) => setPrice(Number(e.target.value))} />
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row w-full gap-2">
                <Button color="danger" isDisabled = {!subject?.is_active} onClick={disableSubject}>Desactivar curso</Button>
                <Button color="primary"  isDisabled = {subject?.is_active} onClick={enableSubject}>Activar curso</Button>
              </div>
              <div className="flex flex-row w-full gap-2">
                <Button color="primary" className="w-1/2" onClick={handleSave}>Guardar</Button>
                <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
              </div>
            </div>
        </Card>

        <Card className="flex flex-col w-3/4 overflow-y-scroll">
            <h1 className="font-bold text-xl">Sessiones</h1>
            <Card className="w-full overflow-x-scroll overflow-y-scroll">
                <Table>
                    <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Seccion</Table.HeadCell>
                    <Table.HeadCell>Título</Table.HeadCell>
                    <Table.HeadCell>Video</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {sessions.map((sesion) => (
                        <Table.Row key={sesion._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{sesion.section_title}</Table.Cell>
                            <Table.Cell>{sesion.title}</Table.Cell>
                            <Table.Cell>{sesion.video}</Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
            </Card>
            <Card>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col w-full md:w-1/2">
                  <Label>Editar sesión</Label>
                  <Select>
                    <option>Sesión...</option>
                    <option>Sesión 1</option>
                    <option>Sesión 2</option>
                    <option>Sesión 3</option>
                    <option>Sesión 4</option>
                    <option>Sesión 5</option>
                    <option>Sesión 6</option>
                    <option>Sesión 7</option>
                    <option>Sesión 8</option>
                    <option>Sesión 9</option>
                  </Select>

                  <Label>Nombre o título de la sesión</Label>
                  <TextInput placeholder="Título" defaultValue={"Lorem impsun"} className="w-full" />

                  <Label>Autores o docente</Label>
                  <TextInput placeholder="Autores" defaultValue={"Lorem impsun"} className="w-full" />

                  <Label>Dificultad</Label>
                  <TextInput placeholder="Dificultad" defaultValue={"ruta-1-2-3"} className="w-full" />
                  <Label>Cambiar Nro de sesión</Label>
                  <Select>
                    <option>Sesión...</option>
                    <option>Sesión 1</option>
                    <option>Sesión 2</option>
                    <option>Sesión 3</option>
                    <option>Sesión 4</option>
                    <option>Sesión 5</option>
                    <option>Sesión 6</option>
                    <option>Sesión 7</option>
                    <option>Sesión 8</option>
                    <option>Sesión 9</option>
                  </Select>
                </div>
                <div className="flex flex-col w-1/2">
                <Label>Subir video</Label>
                        <Label
                          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5 w-full">
                            <svg
                              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AMV, WAV  (MAX. 800x400px)</p>
                          </div>
                          <FileInput  className="hidden" />
                </Label>
                </div>
              </div>
              <Button color="primary" className="mt-4">Guardar</Button>
            </Card>
          </Card>
    </div>
  )
}

export default SubjectDetail