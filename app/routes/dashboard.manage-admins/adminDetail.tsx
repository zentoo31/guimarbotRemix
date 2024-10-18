import { Card, TextInput, Label, Table } from "flowbite-react"
import { Button } from "@nextui-org/react"
import {HiMail} from "react-icons/hi"

const accionesAdmin = [
    {
      fechaAccion: '2024-10-01 14:30:00',
      accion: 'Creación de usuario',
      usuario: 'juanperez',
    },
    {
      fechaAccion: '2024-10-02 09:15:00',
      accion: 'Eliminación de cuenta',
      usuario: 'anagarcia',
    },
    {
      fechaAccion: '2024-10-03 11:00:00',
      accion: 'Actualización de permisos',
      usuario: 'luismartinez',
    },
    {
      fechaAccion: '2024-10-04 16:45:00',
      accion: 'Reinicio de contraseña',
      usuario: 'mariaruiz',
    },
    {
      fechaAccion: '2024-10-05 08:30:00',
      accion: 'Suspensión de usuario',
      usuario: 'pedrogomez',
    },
    {
      fechaAccion: '2024-10-06 10:00:00',
      accion: 'Activación de cuenta',
      usuario: 'luisalopez',
    },
    {
      fechaAccion: '2024-10-07 12:15:00',
      accion: 'Actualización de datos personales',
      usuario: 'carmenfernandez',
    },
    {
      fechaAccion: '2024-10-08 14:50:00',
      accion: 'Asignación de roles',
      usuario: 'susanarodriguez',
    },
    {
      fechaAccion: '2024-10-09 17:20:00',
      accion: 'Desbloqueo de usuario',
      usuario: 'miguelmorales',
    },
    {
      fechaAccion: '2024-10-10 13:35:00',
      accion: 'Eliminación de datos obsoletos',
      usuario: 'josephernandez',
    },
  ];

function AdminDetail() {
  return (
    <div className="w-full p-10 flex flex-row gap-2">
        <Card className="flex flex-col items-center text-center justify-between w-1/4">
          <div>
            <div className="w-full flex flex-row items-center justify-center"> 
              <img src="https://i.pravatar.cc/250" alt="" className="rounded-full w-40 h-40"/>
              </div>
              <h1 className="font-bold text-xl">Información de perfil</h1>
              <div className="flex flex-col text-start items-start gap-2 ">
                  <Label>Nombre</Label>
                  <TextInput placeholder="Nombre" defaultValue={"Lorem impsun"} className="w-full"/>
                  <Label>Apellidos</Label>
                  <TextInput placeholder="Nombre" defaultValue={"Lorem impsun"} className="w-full"/>
                  <Label>Usuario</Label>
                  <TextInput placeholder="Nombre" defaultValue={"user123"} className="w-full"/>
                  <Label>Correo</Label>
                  <TextInput placeholder="Nombre" defaultValue={"user@example.com"} className="w-full"/>
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
                <Button color="secondary">Remover permisos</Button>
                <Button color="primary" variant="bordered" isDisabled>Activar cuenta</Button>
              </div>
              <div className="flex flex-row w-full gap-2">
                <Button color="primary" className="w-1/2">Guardar</Button>
                <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
              </div>
            </div>
        </Card>

        <Card className="flex flex-col w-3/4 overflow-y-scroll">
        <Table>
            <Table.Head>
              <Table.HeadCell>Fecha de acción</Table.HeadCell>
              <Table.HeadCell>Acción</Table.HeadCell>
              <Table.HeadCell>Usuario</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {accionesAdmin.map((accion) => (
                <Table.Row key={accion.usuario} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{accion.fechaAccion}</Table.Cell>
                  <Table.Cell>{accion.accion}</Table.Cell>
                  <Table.Cell>{accion.usuario}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
              
        </Card>
    </div>
  )
}

export default AdminDetail