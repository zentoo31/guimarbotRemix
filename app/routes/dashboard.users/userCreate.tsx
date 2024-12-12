import {Card, Label, Select, TextInput } from "flowbite-react"
import { Button, Image } from "@nextui-org/react"
import { UserService } from "~/services/user.service"
import { User } from "~/models/user"
import { useState } from "react"
import { toast } from "react-toastify"

function UserCreate() {
  const userService = new UserService();
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const createUser = async () => {
    setRole("student");
    if (!first_name || !last_name || !username || !email || !role || !password) {
      toast.warning("Por favor, llena todos los campos");
      return;
    }

    setLoading(true);
    const user: User = {
      first_name,
      last_name,
      username,
      birthdate: "null",
      email,
      role,
      password,
    };

    try {
      await userService.createUser(user);
      toast.success("Usuario creado correctamente");
    } catch (error) {
      toast.error("Error al crear el usuario");
      console.error("Error al crear el usuario:", error);
    } finally {
      setLoading(false);
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
                  <TextInput placeholder="Apellidos" className="w-full" onChange={(e)=> {setLast_name(e.target.value)}}/>
                  <Label>Usuario</Label>
                  <TextInput placeholder="Usuario" className="w-full" onChange={(e)=> {setUsername(e.target.value)}}/>
                  <Label>Correo</Label>
                  <TextInput placeholder="Correo" className="w-full" onChange={(e) => {setEmail(e.target.value)}}/>
                  <Label>Tipo</Label>
                  <div className="w-full">
                      <Select onChange={(e) => {setRole(e.target.value)}}>
                        <option>student</option>
                        <option>teacher</option>
                      </Select> 
                  </div>
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
                <Button color="primary" className="w-1/2" onClick={createUser} isLoading = {loading}>Guardar</Button>
                <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
              </div>
            </div>
        </Card>
    </div>
  )
}

export default UserCreate