import { Card, TextInput, Label, Table } from "flowbite-react"
import { Button, Image } from "@nextui-org/react"
import {HiMail} from "react-icons/hi"
import { AdminService } from "~/services/admins.service";
import { AdminLogsService } from "~/services/admin.logs.service";
import { Admin } from "~/models/admin";
import { useState, useEffect } from "react";
import { AuthLog } from "~/models/authLog";
import moment from "moment";


interface adminDetailProps{
  adminID: string;
}

function AdminDetail({adminID}: adminDetailProps) {
  const adminService = new AdminService();
  const adminLogsService = new AdminLogsService();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [authLogs, setAuthLogs] = useState<AuthLog[]>([]);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");

  const updateAdmin = async () => {
    const adminUpdated = {
      _id: adminID,
      username,
      email,
      password: "",
      first_name,
      last_name
    }
    try{
      await adminService.updateAdmin(adminUpdated);
      console.log("Administrador actualizado correctamente");
      loadAdmin();
    }catch(error){
      console.error("Error al actualizar el administrador:", error);
    }
  }


  const loadAdmin = async () => {
    try{
      const admin = await adminService.getAdminById(adminID);
      setAdmin(admin);
      setUsername(admin.username);
      setEmail(admin.email);
      setFirst_name(admin.first_name);
      setLast_name(admin.last_name);
    }catch(error){
      console.error("Error al cargar el administrador:", error);
    }
  }

  const loadAuthLogs = async () => {
    try{
      const logs = await adminLogsService.getAuthLogsByAdminId(adminID);
      setAuthLogs(logs);
    }catch(error){
      console.error("Error al cargar los logs de autenticación:", error);
    }
  }

  useEffect(() => {
    loadAdmin();
    loadAuthLogs();
  }, []);
  

  return (
    <div className="w-full p-10 flex flex-row gap-2">
        <Card className="flex flex-col items-center text-center justify-between w-1/4">
          <div>
            <div className="w-full flex flex-row items-center justify-center"> 
              <Image src={admin?.profile_picture} className="rounded-full w-40 h-40"/>
              </div>
              <h1 className="font-bold text-xl">Información de perfil</h1>
              <div className="flex flex-col text-start items-start gap-2 ">
                  <Label>Nombre</Label>
                  <TextInput placeholder="Nombre" defaultValue={admin?.first_name} className="w-full" onChange={(e) => setFirst_name(e.target.value)}/>
                  <Label>Apellidos</Label>
                  <TextInput placeholder="Nombre" defaultValue={admin?.last_name} className="w-full" onChange={(e) => setLast_name(e.target.value)}/>
                  <Label>Usuario</Label>
                  <TextInput placeholder="Nombre" defaultValue={admin?.username} className="w-full" onChange={(e) => setUsername(e.target.value)}/>
                  <Label>Correo</Label>
                  <TextInput placeholder="Nombre" defaultValue={admin?.email} className="w-full" onChange={(e) => setEmail(e.target.value)}/>
                  <div className="flex flex-row items-end gap-2 w-full">
                      <div >
                          <Label>Contraseña</Label>
                          <TextInput placeholder="Nombre" type="password" defaultValue={"user@example.com"} disabled/>
                      </div>
                      <div>
                          <Button size="md" color="primary" className="flex flex-row gap-2"><HiMail className="w-5 h-5" /> Enviar correo de cambio</Button>
                      </div>
                  </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col w-full gap-2">
                <Button color="danger">Desactivar cuenta</Button>
                <Button color="primary" variant="bordered" isDisabled>Activar cuenta</Button>
              </div>
              <div className="flex flex-row w-full gap-2">
                <Button color="primary" className="w-1/2" onClick={updateAdmin}>Guardar</Button>
                <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
              </div>
            </div>
        </Card>

        <Card className="flex flex-col w-3/4 overflow-y-scroll">
        <h1 className="font-bold text-xl">Logs de autenticación</h1>
        <Table>
            <Table.Head>
              <Table.HeadCell>Dirección IP</Table.HeadCell>
              <Table.HeadCell>Navegador</Table.HeadCell>
              <Table.HeadCell>SO</Table.HeadCell>
              <Table.HeadCell>¿Celular?</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {authLogs.map((log) => (
                <Table.Row key={log._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{log.ip_address}</Table.Cell>
                <Table.Cell>{log.browser}</Table.Cell>
                <Table.Cell>{log.os}</Table.Cell>
                <Table.Cell>{log.is_mobile}</Table.Cell>
                <Table.Cell>{moment(log.date).local().format('D [de] MMMM [de] YYYY, HH:mm')}</Table.Cell>
              </Table.Row>
              ))}
            </Table.Body>
          </Table>
              
        </Card>
    </div>
  )
}

export default AdminDetail