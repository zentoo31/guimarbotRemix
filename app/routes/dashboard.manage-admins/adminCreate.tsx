import {Card, Label, TextInput } from "flowbite-react"
import { Button, Image } from "@nextui-org/react"
import { AdminService } from "~/services/admins.service"
import CustomToast from "~/ui-components/customToast";
import { useState } from "react";

function AdminCreate() {
  const adminService = new AdminService();
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({ message: "", success: false });
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");


  const createAdmin = async () => { 
    if (!first_name || !last_name || !username || !email || !password) {
      alert("Por favor, llena todos los campos");
      return;
    }
    setIsLoading(true);
    const admin = {
      username,
      email,
      password,
      first_name,
      last_name,
    };

    try {
      await adminService.createAdmin(admin);
      setToastProps({ message: "Administrador creado correctamente", success: true });
    } catch (error) {
      setToastProps({ message: "Error al crear el administrador", success: false });
      console.error("Error al crear el administrador:", error);
    } finally {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => {setShowToast(false)}, 3000);
    }
  }

  return (
    <div>
        <Card className="flex flex-col items-center text-center justify-between w-full">
          <div className="w-[500px]">
            <div className="w-full flex flex-row items-center justify-center"> 
              <Image src="https://i.imgur.com/RiGVJfC.png" alt="" className="rounded-full w-40 h-40"/>
              </div>
              <h1 className="font-bold text-xl">Información de perfil</h1>
              <div className="flex flex-col text-start items-start gap-2 ">
                  <Label>Nombre</Label>
                  <TextInput placeholder="Nombres"  className="w-full" onChange={(e) => {setFirst_name(e.target.value)}}/>
                  <Label>Apellidos</Label>
                  <TextInput placeholder="Apellidos" className="w-full" onChange={(e) => {setLast_name(e.target.value)}}/>
                  <Label>Usuario</Label>
                  <TextInput placeholder="Usuario" className="w-full" onChange={(e) => {setUsername(e.target.value)}}/>
                  <Label>Correo</Label>
                  <TextInput placeholder="Correo" className="w-full" onChange={(e) => {setEmail(e.target.value)}}/>
                  <div className="flex flex-row items-end gap-2 w-full">
                      <div className="w-full">
                          <Label>Contraseña</Label>
                          <TextInput placeholder="Contraseña" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                      </div>
                  </div>
              </div>
              
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row w-full gap-2">
                <Button color="primary" className="w-1/2" onClick={createAdmin} isLoading = {isLoading}>Guardar</Button>
                <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
              </div>
            </div>
        </Card>
        {showToast && <CustomToast {...toastProps} />}
    </div>
  )
}

export default AdminCreate;