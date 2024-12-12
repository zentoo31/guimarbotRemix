import type { MetaFunction } from "@remix-run/node";
import { Button } from "@nextui-org/react";
import { TextInput, Label } from "flowbite-react";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { AuthService } from "~/services/auth.service";
import CustomToast from "~/ui-components/customToast";
import { UAParser } from 'ua-parser-js';

export const meta: MetaFunction = () => {
  return [
    { title: "Login: Guimarbot administrativo" },
    { name: "página de inicio de sesión", content: "Bienvenido a guimarbot" },
  ];
};

function Login() {
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({ message: "", success: false });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService();
  const navigate = useNavigate();


  const getDeviceDetails = () => {
    const userAgent = window.navigator.userAgent; // Obtener el user-agent del navegador
    const parser = new UAParser(userAgent.toString()); 
    const result = parser.getResult();
    return {
      os: result.os.name || "Unknown OS", 
      browser: result.browser.name || "Unknown Browser", 
      isMobile: result.device.type === "mobile", 
    };
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const { os, browser, isMobile } = getDeviceDetails();
    try {
      const data = await authService.login(email, password, {
        os,
        browser,
        isMobile,
      });      
      console.log(data);
      
      if (data.message === "Administrador autenticado") {
        setToastProps({ message: "Usuario creado correctamente", success: true });
        setTimeout( () =>{
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      console.error(error);
      setToastProps({ message: "Error al iniciar sesión", success: false });
    } finally{
      setIsLoading(false);
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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

      {showToast && <CustomToast {...toastProps} />}

    </div>
  )
}

export default Login