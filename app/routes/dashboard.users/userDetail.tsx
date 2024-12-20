import { Card, TextInput, Label, Table, Select } from "flowbite-react"
import { Button, DatePicker } from "@nextui-org/react"
import {HiMail} from "react-icons/hi"
import { parseAbsoluteToLocal} from "@internationalized/date";

const suscripciones = [
    {
      estado: 'active',
      tipo: 'Básico',
      uuid: '123e4567-e89b-12d3-a456-426614174010',
      inicio: '2024-01-01',
      final: '2025-01-01',
    },
    {
      estado: 'paused',
      tipo: 'Grupo',
      uuid: '123e4567-e89b-12d3-a456-426614174011',
      inicio: '2023-05-10',
      final: '2024-05-10',
    },
    {
      estado: 'canceled',
      tipo: 'Básico',
      uuid: '123e4567-e89b-12d3-a456-426614174012',
      inicio: '2022-07-15',
      final: '2023-07-15',
    },
    {
      estado: 'active',
      tipo: 'Dúo',
      uuid: '123e4567-e89b-12d3-a456-426614174013',
      inicio: '2024-08-01',
      final: '2025-08-01',
    },
  ];

function UserDetail() {
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    navigator.clipboard.writeText(target.innerText)
      .then(() => {
        console.log('Texto copiado al portapapeles:', target.innerText);
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles:', err);
      });
  };

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
                <Button color="primary" variant="bordered" isDisabled>Activar cuenta</Button>
              </div>
              <div className="flex flex-row w-full gap-2">
                <Button color="primary" className="w-1/2">Guardar</Button>
                <Button color="primary" variant="bordered" className="w-1/2" disabled>Cancelar</Button>
              </div>
            </div>
        </Card>

        <Card className="flex flex-col w-3/4 overflow-y-scroll">
            <h1 className="font-bold text-xl">Historial suscripciones</h1>
            <Card className="w-full overflow-x-scroll overflow-y-scroll">
                <Table>
                    <Table.Head>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>Tipo</Table.HeadCell>
                    <Table.HeadCell>UUID</Table.HeadCell>
                    <Table.HeadCell>Inicio</Table.HeadCell>
                    <Table.HeadCell>Final</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {suscripciones.map((sub) => (
                        <Table.Row key={sub.uuid} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{sub.estado}</Table.Cell>
                            <Table.Cell>{sub.tipo}</Table.Cell>
                            <Table.Cell><button onClick={handleCopy}>{sub.uuid}</button></Table.Cell>
                            <Table.Cell>{sub.inicio}</Table.Cell>
                            <Table.Cell>{sub.final}</Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
            </Card>
              <Card >
                <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-2"> 
                  <h1>Acción por suscripción</h1>
                  <div className="flex flex-row items-end gap-2">
                    <div>
                      <Label>Suscripción</Label>
                      <TextInput placeholder="Nombre" defaultValue={"123e4567-e89b-12d3-a456-426614174010"} className="w-full"/>  
                    </div> 
                      <Button color="primary">Consultar</Button>
                  </div>
                  <div className="flex flex-row gap-2">
                      <Button color="danger">Desactivar</Button>
                      <Button color="warning">Suspender tiempo</Button>
                  </div>
                </div>
                <div>
                    <Table>
                      <Table.Head>
                      <Table.HeadCell>Estado</Table.HeadCell>
                      <Table.HeadCell>Tipo</Table.HeadCell>
                      <Table.HeadCell>UUID</Table.HeadCell>
                      <Table.HeadCell>Inicio</Table.HeadCell>
                      <Table.HeadCell>Final</Table.HeadCell>
                      <Table.HeadCell>
                          <span className="sr-only">Edit</span>
                      </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                          <Table.Row key={suscripciones[1].uuid} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell>{suscripciones[1].estado}</Table.Cell>
                              <Table.Cell>{suscripciones[1].tipo}</Table.Cell>
                              <Table.Cell>{suscripciones[1].uuid}</Table.Cell>
                              <Table.Cell>{suscripciones[1].inicio}</Table.Cell>
                              <Table.Cell>{suscripciones[1].final}</Table.Cell>
                          </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </Card>
              <Card>
                <h1>Añadir suscripción</h1>
                <div className="flex flex-row gap-2 items-center w-full">
                    <div className="w-1/3">
                      <Select>
                        <option>Tipo...</option>
                        <option>Básico</option>
                        <option>Dúo</option>
                        <option>Grupo</option>
                      </Select> 
                    </div> 
                    <div className="w-1/3">
                      <DatePicker label = "Fecha de inicio" defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")} showMonthAndYearPickers />
                    </div>
                    <div className="w-1/3">
                      <DatePicker label = "Fecha de fin" defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")} showMonthAndYearPickers />
                    </div>                </div>
                <Button color="primary">Añadir</Button>
              </Card>
            </Card>
    </div>
  )
}

export default UserDetail