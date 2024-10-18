import {Card, Label, Select, TextInput, FileInput } from "flowbite-react"
import { Button } from "@nextui-org/react"


function AdminCreate() {
  return (
    <div>
        <Card className="flex flex-col items-center text-center justify-between w-full">
          <div className="w-[500px]">
            <div className="w-full flex flex-row items-center justify-center"> 
              <img src="https://i.pravatar.cc/250" alt="" className="rounded-full w-40 h-40"/>
              </div>
              <h1 className="font-bold text-xl">Información de perfil</h1>
              <div className="flex flex-col text-start items-start gap-2 ">
                    <Label>Imagen de perfil</Label>
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
                  <Label>Nombre</Label>
                  <TextInput placeholder="Nombres"  className="w-full"/>
                  <Label>Apellidos</Label>
                  <TextInput placeholder="Apellidos" className="w-full"/>
                  <Label>Usuario</Label>
                  <TextInput placeholder="Usuario" className="w-full"/>
                  <Label>Correo</Label>
                  <TextInput placeholder="Correo" className="w-full"/>
                  <Label>Tipo</Label>
                  <div className="w-full">
                      <Select disabled>
                        <option>admin</option>
                      </Select> 
                  </div>
                  <div className="flex flex-row items-end gap-2 w-full">
                      <div className="w-full">
                          <Label>Contraseña</Label>
                          <TextInput placeholder="Contraseña" type="password"/>
                      </div>
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
    </div>
  )
}

export default AdminCreate