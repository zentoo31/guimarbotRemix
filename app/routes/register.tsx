import type { MetaFunction } from "@remix-run/node";
import { Button } from "@nextui-org/react";
import { TextInput, Label, FileInput } from "flowbite-react";
import { HiMail, HiUser, HiLockClosed } from "react-icons/hi";

export const meta: MetaFunction = () => {
    return [
      { title: "Register: Guimarbot administrativo" },
      { name: "página de registro", content: "Bienvenido a guimarbot" },
    ];
  };

  
export default function register() {
  return (
    <div className="flex flex-col justify-center items-center h-full py-10 relative animate-fade-in-down">
    <div className="flex flex-row justify-between items-center text-center space-x-3 ">
      <img src="/favicon.svg" alt="" className="w-20 h-15"/>
      <h1 className="text-4xl font-bold">GuimarBot: <span className="font-normal">Administrativo</span></h1>
    </div>
    <div className="flex flex-col mx-0 w-96">
      <form action="" className="flex flex-col  my-1">
        <div className="my-2">
          <Label htmlFor="names" value="Nombres"/>
          <TextInput id="names" type="text" icon={HiUser} placeholder="Tus nombres" />
        </div>
        <div className="my-2">
          <Label htmlFor="surnames" value="Apellidos"/>
          <TextInput id="surnames" type="text" icon={HiUser} placeholder="Tus apellidos" />
        </div>
        <div className="my-2">
          <Label htmlFor="user" value="Usuario"/>
          <TextInput id="user" type="text" icon={HiUser} placeholder="Tu nombre de usuario" />
        </div>
        <div className="my-2">
          <Label htmlFor="email" value="Correo electrónico"/>
          <TextInput id="email" type="email" icon={HiMail} placeholder="correo@mail.com" />
        </div>
        <div className="my-2">
          <Label htmlFor="password" value="Contraseña"/>
          <TextInput id="password" type="password" icon={HiLockClosed} placeholder="Tu contraseña" />
        </div>
        <div className="my-2">
          <Label htmlFor="repeat" value="Repite tu contraseña"/>
          <TextInput id="repeat" type="password" icon={HiLockClosed} placeholder="Repite tu contraseña" />
        </div>
        <div className="my-2">
          <Label value="Ingresa los documentos requisito"></Label>
          <Label
              htmlFor="dropzone-file" className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click para subir archivo</span> o arrastra y suelta
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, PNG, JPG</p>
              </div>
              <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>
        <Button color="primary">Registrarse</Button>
      </form>
    </div> 
  </div>
  )
}
