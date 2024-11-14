import type { MetaFunction } from "@remix-run/node";
import { Button } from "@nextui-org/react";
import { TextInput, Label, Toast } from "flowbite-react";
import { HiMail, HiLockClosed, HiCheck } from "react-icons/hi";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { AuthService } from "~/services/auth.service";

export const meta: MetaFunction = () => {
  return [
    { title: "Login: Guimarbot administrativo" },
    { name: "página de inicio de sesión", content: "Bienvenido a guimarbot" },
  ];
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService();
  const navigate = useNavigate();


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data.message === "Administrador autenticado") {
        setShowToast(true);
        setTimeout( () =>{
          setShowToast(false);
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

    return (
    <div className="flex flex-col justify-center items-center h-[100vh] py-10 relative animate-fade-in-down">
      <div className="flex flex-row justify-between items-center text-center space-x-3 ">
        <img src="/favicon.ico" alt="" className="w-20 h-15"/>
        <h1 className="text-4xl font-bold">GuimarBot: <span className="font-normal">Administrativo</span></h1>
      </div>
      <div className="flex flex-col mx-0 w-96">
        <form action="" className="flex flex-col my-1" onSubmit={handleLogin}>
          <div className="my-2">
            <Label htmlFor="email" value="Correo electrónico"/>
            <TextInput id="email" type="email" icon={HiMail} placeholder="correo@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} spellCheck="false"/>
          </div>
          <div className="my-2">
            <Label htmlFor="password" value="Contraseña"/>
            <TextInput id="password" type="password" icon={HiLockClosed} placeholder="Tu contraseña" value={password}  onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button color="primary" type="submit" isLoading = {isLoading} >Iniciar sesión</Button>
        </form>
      </div> 

      { showToast && (
        <div className="absolute bottom-5 right-5">
          <Toast className="animate-fade-in-up">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Sesión iniciada exitosamente.
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}


    </div>
  )
}

export default Login