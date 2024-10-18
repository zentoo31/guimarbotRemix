import { Card, TextInput, Label, Table, Select, FileInput } from "flowbite-react"
import { Button } from "@nextui-org/react"


const sesiones = [
  {
    nombre: 'Introducción a Angular',
    dificultad: 'Principiante',
    autores: ['Carlos Pérez', 'María López'],
    numeroSesion: 1,
  },
  {
    nombre: 'Componentes y Plantillas en Angular',
    dificultad: 'Principiante',
    autores: ['Ana García', 'Luis Martínez'],
    numeroSesion: 2,
  },
  {
    nombre: 'Data Binding y Directivas',
    dificultad: 'Intermedio',
    autores: ['Juan Hernández', 'Sofía Torres'],
    numeroSesion: 3,
  },
  {
    nombre: 'Rutas y Navegación en Angular',
    dificultad: 'Intermedio',
    autores: ['Raúl Díaz', 'Clara Morales'],
    numeroSesion: 4,
  }
];


function SubjectDetail() {
  return (
    <div className="w-full p-10 flex flex-row gap-2">
        <Card className="flex flex-col items-center text-center justify-between w-1/4">
          <div>
            <div className="w-full flex flex-row items-center justify-center"> 
              <img src="https://www.generalceramic.com/wp-content/uploads/2022/05/Evolution-Gris-Claro-Brillo-en-lOKHS9PwoXjGjfza.jpg" alt="" className="w-60 h-40"/>
              </div>
              <h1 className="font-bold text-xl">Información del curso</h1>
              <div className="flex flex-col text-start items-start gap-2 w-full">
                  <Label>Nombre o titulo</Label>
                  <TextInput placeholder="Titulo" defaultValue={"Lorem impsun"} className="w-full"/>
                  <Label>Autor o docente</Label>
                  <TextInput placeholder="Autor" defaultValue={"Lorem impsun"} className="w-full"/>
                  <Label>RutaID</Label>
                  <TextInput placeholder="rutaId" defaultValue={"ruta-1-2-3"} className="w-full"/>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col w-full gap-2">
                <Button color="danger">Desactivar curso</Button>
                <Button color="primary" variant="bordered" isDisabled>Activar curso</Button>
              </div>
              <div className="flex flex-row w-full gap-2">
                <Button color="primary" className="w-1/2">Guardar</Button>
                <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
              </div>
            </div>
        </Card>

        <Card className="flex flex-col w-3/4 overflow-y-scroll">
            <h1 className="font-bold text-xl">Sesiones</h1>
            <Card className="w-full overflow-x-scroll overflow-y-scroll">
                <Table>
                    <Table.Head>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Autores</Table.HeadCell>
                    <Table.HeadCell>Dificultad</Table.HeadCell>
                    <Table.HeadCell>Nro de sesion</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {sesiones.map((sesion) => (
                        <Table.Row key={sesion.nombre} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{sesion.nombre}</Table.Cell>
                            <Table.Cell>{sesion.autores}</Table.Cell>
                            <Table.Cell>{sesion.dificultad}</Table.Cell>
                            <Table.Cell>{sesion.numeroSesion}</Table.Cell>
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