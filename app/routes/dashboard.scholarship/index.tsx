import { MetaFunction } from "@remix-run/react"
import { Card, Table } from "flowbite-react";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { HiUsers} from "react-icons/hi";
import RequestRead from "./requestRead";
const peticionesBeca = [
  {
    nombre: "María",
    apellido: "López",
    mensaje: "Estoy interesada en la beca para estudiantes de programación.",
    documentos: ["Curriculum Vitae", "Carta de motivación"],
    razon: "Necesito apoyo financiero para continuar mis estudios.",
  },
  {
    nombre: "Carlos",
    apellido: "Martínez",
    mensaje: "Quisiera aplicar a la beca de desarrollo web.",
    documentos: ["Carta de recomendación", "Portafolio de proyectos"],
    razon: "Quiero mejorar mis habilidades y expandir mi conocimiento.",
  },
  {
    nombre: "Ana",
    apellido: "García",
    mensaje: "Me gustaría recibir apoyo para el curso avanzado de Angular.",
    documentos: ["Certificados previos", "Ensayo personal"],
    razon: "Deseo especializarme en tecnologías modernas de frontend.",
  },
  {
    nombre: "Luis",
    apellido: "Fernández",
    mensaje: "Solicito una beca para el programa de inteligencia artificial.",
    documentos: ["Expediente académico", "Proyecto de investigación"],
    razon: "Estoy interesado en desarrollar proyectos innovadores.",
  },
  {
    nombre: "Elena",
    apellido: "Rodríguez",
    mensaje: "Busco apoyo financiero para estudiar desarrollo de software.",
    documentos: ["Referencias laborales", "Carta de interés"],
    razon: "Quiero contribuir al campo de la programación con mis habilidades.",
  },
  {
    nombre: "Juan",
    apellido: "Pérez",
    mensaje: "Me gustaría postular a la beca para cursos de programación backend.",
    documentos: ["Carta de recomendación", "Transcripción académica"],
    razon: "Quiero enfocar mi carrera en el desarrollo backend.",
  },
  {
    nombre: "Laura",
    apellido: "Ramírez",
    mensaje: "Estoy interesada en la beca para desarrolladores web junior.",
    documentos: ["Carta de motivación", "Portfolio"],
    razon: "Quiero adquirir habilidades prácticas en desarrollo web.",
  },
  {
    nombre: "David",
    apellido: "González",
    mensaje: "Solicito una beca para el curso avanzado de React.",
    documentos: ["Ensayo personal", "Carta de recomendación"],
    razon: "Quiero dominar frameworks modernos de frontend.",
  },
  {
    nombre: "Sofía",
    apellido: "Hernández",
    mensaje: "Busco una beca para el programa de diseño UX/UI.",
    documentos: ["Portafolio de diseño", "Curriculum Vitae"],
    razon: "Quiero mejorar la experiencia del usuario en aplicaciones web.",
  },
  {
    nombre: "Miguel",
    apellido: "Vargas",
    mensaje: "Quisiera aplicar a la beca de desarrollo móvil.",
    documentos: ["Carta de recomendación", "Proyectos personales"],
    razon: "Estoy interesado en desarrollar aplicaciones móviles innovadoras.",
  },
];


export const meta: MetaFunction = () => {
  return [
    {title: "Gestor de becas | Guimarbot administrativo"}
  ]
}

function Index() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="w-full animate-fade-in-down flex flex-col gap-4 h-[100vh]">
        <Card>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl flex flex-row gap-2 items-center">Peticiones de beca <HiUsers className="w-5 h-5" opacity={0.5}/> </h1>
          </div>
          <div className="overflow-x-scroll overflow-y-scroll max-h-[75vh]">
          <div className="pb-4 ">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por uuid" />
            </div>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellido</Table.HeadCell>
              <Table.HeadCell>Mensaje</Table.HeadCell>
              <Table.HeadCell>Documentos</Table.HeadCell>
              <Table.HeadCell>Razón</Table.HeadCell>
              <Table.HeadCell>Acción</Table.HeadCell>
              <Table.HeadCell>Acción</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {peticionesBeca.map((beca) => (
                <Table.Row key={beca.nombre} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{beca.nombre}</Table.Cell>
                  <Table.Cell>{beca.apellido}</Table.Cell>
                  <Table.Cell>{beca.mensaje}</Table.Cell>
                  <Table.Cell>{beca.documentos}</Table.Cell>
                  <Table.Cell>{beca.razon}</Table.Cell>
                  <Table.Cell>
                    <Button onPress={onOpen} className="font-mediu" color="primary">Leer</Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button  className="font-mediu" color="danger">Eliminar</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="full">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                <RequestRead/>
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