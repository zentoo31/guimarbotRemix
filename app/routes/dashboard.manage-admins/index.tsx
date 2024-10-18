
import { MetaFunction } from "@remix-run/react"
import { Card, Table } from "flowbite-react";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { HiPlus, HiKey} from "react-icons/hi";
import AdminDetail from "./adminDetail";
import AdminCreate from "./adminCreate";

export const meta: MetaFunction = () => {
  return [
      {title: "Gestor de administradores | Guimarbot administrativo"}
  ]
}


const admins = [
  {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    nombre: 'Juan',
    apellido: 'Pérez',
    usuario: 'juanperez',
    fechaNacimiento: '1990-01-01',
    telefono: '555-1234',
    direccion: '123 Calle Falsa, Ciudad Ficticia',
  },
  {
    uuid: '123e4567-e89b-12d3-a456-426614174001',
    nombre: 'Ana',
    apellido: 'García',
    usuario: 'anagarcia',
    fechaNacimiento: '1985-05-10',
    telefono: '555-5678',
    direccion: '456 Avenida Real, Pueblo Imaginario',
  },
  {
    uuid: '123e4567-e89b-12d3-a456-426614174002',
    nombre: 'Luis',
    apellido: 'Martínez',
    usuario: 'luismartinez',
    fechaNacimiento: '1992-09-15',
    telefono: '555-8765',
    direccion: '789 Calle Verdadera, Ciudad Real',
  },
  {
    uuid: '123e4567-e89b-12d3-a456-426614174002',
    nombre: 'Luis',
    apellido: 'Martínez',
    usuario: 'luismartinez',
    fechaNacimiento: '1992-09-15',
    telefono: '555-8765',
    direccion: '789 Calle Verdadera, Ciudad Real',
  },
  {
    uuid: '123e4567-e89b-12d3-a456-426614174002',
    nombre: 'Luis',
    apellido: 'Martínez',
    usuario: 'luismartinez',
    fechaNacimiento: '1992-09-15',
    telefono: '555-8765',
    direccion: '789 Calle Verdadera, Ciudad Real',
  }
];

function Index() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onOpenChange: onCreateModalChange } = useDisclosure();
  return (
    <div className="w-full animate-fade-in-down flex flex-col gap-4 h-[90vh]">
        <Card>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl flex flex-row gap-2 items-center">Administradores <HiKey className="w-5 h-5" opacity={0.5}/> </h1>
            <div className="flex flex-row">
              <Button color="primary" className="flex flex-row" onPress={onCreateModalOpen}> <HiPlus className="w-5 h-5"/> Agregar admin</Button>
            </div>
          </div>
          <div className="overflow-x-scroll overflow-y-scroll max-h-[50vh]">
          <div className="pb-4 ">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por uuid o usuario" />
            </div>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellido</Table.HeadCell>
              <Table.HeadCell>Usuario</Table.HeadCell>
              <Table.HeadCell>Fecha de Nacimiento</Table.HeadCell>
              <Table.HeadCell>Teléfono</Table.HeadCell>
              <Table.HeadCell>Dirección</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {admins.map((admin) => (
                <Table.Row key={admin.uuid} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{admin.nombre}</Table.Cell>
                  <Table.Cell>{admin.apellido}</Table.Cell>
                  <Table.Cell>{admin.usuario}</Table.Cell>
                  <Table.Cell>{admin.fechaNacimiento}</Table.Cell>
                  <Table.Cell>{admin.telefono}</Table.Cell>
                  <Table.Cell>{admin.direccion}</Table.Cell>
                  <Table.Cell>
                    <Button onPress={onOpen} className="font-mediu" color="primary">editar</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="full">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                <AdminDetail />
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal isOpen={isCreateModalOpen} onOpenChange={onCreateModalChange} backdrop="blur" size="5xl">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                <AdminCreate/>
                </>
              )}
            </ModalContent>
          </Modal>
          </div>
        </Card>
    </div>
  )
}

export default Index