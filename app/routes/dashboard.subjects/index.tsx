import { MetaFunction } from "@remix-run/react"
import { Card, Table } from "flowbite-react";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { HiPlus, HiBookOpen} from "react-icons/hi";
import SubjectCreate from "./subjectCreate";
import SubjectDetail from "./subjectDetail";
import RouteCreate from "./routeCreate";
import RouteDetail from "./routeDetail";
import { useEffect, useState } from "react";
import { SubjectService } from "~/services/subject.service";
import { Subject } from "~/models/subject";

export const meta: MetaFunction = () => {
  return [
    {title: "Gestor de cursos | Guimarbot administrativo"}
  ]
}


const rutas = [
  {
    rutaid: 'ruta-js-basico',
    nombre: 'JavaScript Básico',
    descripcion: 'Introducción a los conceptos fundamentales de JavaScript.',
    dificultad: 'Principiante',
    categoria: 'Programación',
    fechaCreacion: '2024-09-01',
  },
  {
    rutaid: 'ruta-html-avanzado',
    nombre: 'HTML Avanzado',
    descripcion: 'Curso avanzado sobre las últimas técnicas y estándares de HTML.',
    dificultad: 'Intermedio',
    categoria: 'Desarrollo Web',
    fechaCreacion: '2024-09-05',
  },
  {
    rutaid: 'ruta-css-basico',
    nombre: 'CSS para Principiantes',
    descripcion: 'Guía completa para principiantes que quieran aprender CSS desde cero.',
    dificultad: 'Principiante',
    categoria: 'Diseño Web',
    fechaCreacion: '2024-09-10',
  },
  {
    rutaid: 'ruta-react-intermedio',
    nombre: 'Desarrollo con React',
    descripcion: 'Profundiza en el desarrollo de aplicaciones usando React.',
    dificultad: 'Intermedio',
    categoria: 'Programación',
    fechaCreacion: '2024-09-12',
  },
  {
    rutaid: 'ruta-ts-basico',
    nombre: 'TypeScript Básico',
    descripcion: 'Curso para aprender TypeScript y su uso en aplicaciones JavaScript.',
    dificultad: 'Principiante',
    categoria: 'Programación',
    fechaCreacion: '2024-09-15',
  },
  {
    rutaid: 'ruta-node-intro',
    nombre: 'Introducción a Node.js',
    descripcion: 'Aprende los conceptos básicos y la configuración inicial de Node.js.',
    dificultad: 'Intermedio',
    categoria: 'Backend',
    fechaCreacion: '2024-09-18',
  },
  {
    rutaid: 'ruta-sql-basico',
    nombre: 'SQL para Desarrolladores',
    descripcion: 'Guía esencial para entender bases de datos SQL y cómo trabajar con ellas.',
    dificultad: 'Principiante',
    categoria: 'Bases de Datos',
    fechaCreacion: '2024-09-20',
  },
  {
    rutaid: 'ruta-angular-intro',
    nombre: 'Angular desde Cero',
    descripcion: 'Curso introductorio para desarrollar aplicaciones con Angular.',
    dificultad: 'Intermedio',
    categoria: 'Programación',
    fechaCreacion: '2024-09-22',
  },
  {
    rutaid: 'ruta-python-basico',
    nombre: 'Python para Principiantes',
    descripcion: 'Curso para principiantes sobre los fundamentos de Python.',
    dificultad: 'Principiante',
    categoria: 'Programación',
    fechaCreacion: '2024-09-25',
  },
  {
    rutaid: 'ruta-django-intro',
    nombre: 'Desarrollo Web con Django',
    descripcion: 'Introducción al desarrollo web utilizando el framework Django.',
    dificultad: 'Intermedio',
    categoria: 'Backend',
    fechaCreacion: '2024-09-28',
  },
];


function Index() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onOpenChange: onCreateModalChange } = useDisclosure();
  const {isOpen: isCreateRoute, onOpen: onCreateRoute, onOpenChange: onCreateRouteChange} = useDisclosure();
  const { isOpen: isEditRoute, onOpen: onEditeRoute, onOpenChange: onEditRouteChange } = useDisclosure();

  const [subjects, setSubjects] = useState<Subject[] | null>(null); 

  useEffect(() => {
    const loadSubjects = async () => {
      const subjectService = new SubjectService();
      const subjects = await subjectService.getSubjects();
      setSubjects(subjects);
      console.log(subjects);      
    }
    loadSubjects();
  }, []);

  return (
    <div className="w-full animate-fade-in-down flex flex-col gap-4">
        <Card>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl flex flex-row gap-2 items-center">Cursos <HiBookOpen className="w-5 h-5" opacity={0.5}/> </h1>
            <div className="flex flex-row">
              <Button color="primary" className="flex flex-row" onPress={onCreateModalOpen}> <HiPlus className="w-5 h-5"/> Agregar curso</Button>
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
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por uuid o nombre" />
            </div>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>uuid</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Autor</Table.HeadCell>
              <Table.HeadCell>Level</Table.HeadCell>
              <Table.HeadCell>Fecha de creación</Table.HeadCell>
              <Table.HeadCell>Ruta</Table.HeadCell>
              <Table.HeadCell>Acción</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {subjects?.map((curso) => (
                <Table.Row key={curso._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{curso._id}</Table.Cell>
                  <Table.Cell>{curso.title}</Table.Cell>
                  <Table.Cell>{curso.author}</Table.Cell>
                  <Table.Cell>{curso.level}</Table.Cell>
                  <Table.Cell>{curso.created_at}</Table.Cell>
                  <Table.Cell>{curso.level}</Table.Cell>
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
                <SubjectDetail/>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal isOpen={isCreateModalOpen} onOpenChange={onCreateModalChange} backdrop="blur" size="full">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                 <SubjectCreate/>
                </>
              )}
            </ModalContent>
          </Modal>
          </div>
        </Card>
        
        <Card>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl flex flex-row gap-2 items-center">Rutas <HiBookOpen className="w-5 h-5" opacity={0.5}/> </h1>
            <div className="flex flex-row">
              <Button color="primary" className="flex flex-row" onPress={onCreateRoute}> <HiPlus className="w-5 h-5"/> Agregar ruta</Button>
            </div>
          </div>
          <div className="overflow-x-scroll overflow-y-scroll max-h-[50vh]">
          <div className="pb-4 ">
            <label htmlFor="table" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="table" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por uuid o nombre" />
            </div>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>rutaid</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Descripcion</Table.HeadCell>
              <Table.HeadCell>Dificultad</Table.HeadCell>
              <Table.HeadCell>Categoría</Table.HeadCell>
              <Table.HeadCell>Fecha de creación</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {rutas.map((ruta) => (
                <Table.Row key={ruta.rutaid} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{ruta.nombre}</Table.Cell>
                  <Table.Cell>{ruta.descripcion}</Table.Cell>
                  <Table.Cell>{ruta.dificultad}</Table.Cell>
                  <Table.Cell>{ruta.categoria}</Table.Cell>
                  <Table.Cell>{ruta.fechaCreacion}</Table.Cell>
                  <Table.Cell>
                    <Button onPress={onEditeRoute} className="font-mediu" color="primary">editar</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Modal isOpen={isEditRoute} onOpenChange={onEditRouteChange} backdrop="blur" size="full">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                <RouteDetail/>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal isOpen={isCreateRoute} onOpenChange={onCreateRouteChange} backdrop="blur" size="full">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                <RouteCreate/>
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
