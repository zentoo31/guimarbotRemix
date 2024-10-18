import {Card, Label, Select, TextInput, FileInput } from "flowbite-react"
import { Button } from "@nextui-org/react"

function SubjectCreate() {
    return (
        <div className="flex flex-row">
            <Card className="flex flex-col items-center text-center justify-between w-1/2 h-[100vh]">
              <div className="w-[500px]">
                <div className="w-full flex flex-row items-center justify-center"> 
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Graukarte.svg" alt="" className="w-60 h-40"/>
                  </div>
                  <h1 className="font-bold text-xl">Información del Curso</h1>
                  <div className="flex flex-col text-start items-start gap-2 ">
                        <Label>Imagen del curso</Label>
                        <Label
                          htmlFor="dropzone-file"
                          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <FileInput id="dropzone-file" className="hidden" />
                        </Label>
                      <Label>Nombre o Titulo</Label>
                      <TextInput placeholder="Titulo"  className="w-full"/>
                      <Label>Autor o docente</Label>
                      <TextInput placeholder="Autor" className="w-full"/>
                      <Label>RutaId</Label>
                      <TextInput placeholder="rutaid" className="w-full"/>
                      <Label>Tipo</Label>
                      <div className="w-full">
                          <Select>
                            <option>Niños</option>
                            <option>Adolecentes</option>
                            <option>Todos</option>
                          </Select> 
                      </div>
                  </div>
                  
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row w-full gap-2">
                    <Button color="primary" className="w-1/2">Guardar</Button>
                    <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
                  </div>
                </div>
            </Card>

            <Card className="w-1/2">
            <Label>Subir video</Label>
                        <Label
                          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                    <Label>Nombre de la sesión</Label>
                    <TextInput placeholder="Titulo"  className="w-full"/>
                    <Label>Dificultad</Label>
                    <TextInput placeholder="Dificultad" className="w-full"/>
                    <Label>Autores</Label>
                    <TextInput placeholder="Autores" className="w-full"/>
                    <Label>Nro de sesión</Label>
                    <div className="w-full">
                    <Select>
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
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row w-full gap-2">
                    <Button color="primary" className="w-1/2">Guardar</Button>
                    <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
                  </div>
                </div>
            </Card>
        </div>
      )
}

export default SubjectCreate