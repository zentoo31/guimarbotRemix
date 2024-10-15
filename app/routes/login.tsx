import type { MetaFunction } from "@remix-run/node";
import { Button } from "@nextui-org/react";
import { TextInput, Label } from "flowbite-react";
import { HiMail, HiUser, HiLockClosed } from "react-icons/hi";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Login: Guimarbot administrativo" },
    { name: "página de inicio de sesión", content: "Bienvenido a guimarbot" },
  ];
};

function register() {
    return (
    <div className="flex flex-col justify-center items-center h-[100vh] py-10 relative animate-fade-in-down">
      <div className="flex flex-row justify-between items-center text-center space-x-3 ">
        <img src="/favicon.ico" alt="" className="w-20 h-15"/>
        <h1 className="text-4xl font-bold">GuimarBot: <span className="font-normal">Administrativo</span></h1>
      </div>
      <div className="flex flex-col mx-0 w-96">
        <form action="" className="flex flex-col  my-1">
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
          <Button color="primary">Iniciar sesión</Button>
        </form>
        <Link to="/dashboard" className="text-blue-500">Dev: Ingresar al dashboard</Link>
      </div> 
    </div>
  )
}

export default register