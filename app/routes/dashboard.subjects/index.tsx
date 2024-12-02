/* eslint-disable react-hooks/exhaustive-deps */
import { MetaFunction } from "@remix-run/react"
import { Card, Table } from "flowbite-react";
import { Button, Modal, ModalContent, useDisclosure, Chip, Spinner } from "@nextui-org/react";
import { HiPlus, HiBookOpen, HiPencil} from "react-icons/hi";
import SubjectCreate from "./subjectCreate";
import SubjectDetail from "./subjectDetail";
import RouteCreate from "./routeCreate";
import RouteDetail from "./routeDetail";
import SessionCreate from "./sessionCreate";
import { useCallback, useEffect, useState } from "react";
import { SubjectService } from "~/services/subject.service";
import { RouteService } from "~/services/route.service";
import { Subject } from "~/models/subject";
import { Route } from "~/models/route";
import  debounce  from "lodash";


export const meta: MetaFunction = () => {
  return [
    {title: "Gestor de cursos | Guimarbot administrativo"}
  ]
}


function Index() {
  const MIN_ROWS = 15;
  const subjectService = new SubjectService();
  const routeService = new RouteService();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onOpenChange: onCreateModalChange } = useDisclosure();
  const { isOpen: isCreateSession, onOpen: onCreateSession, onOpenChange: onCreateSessionChange } = useDisclosure();
  const { isOpen: isCreateRoute, onOpen: onCreateRoute, onOpenChange: onCreateRouteChange} = useDisclosure();
  const { isOpen: isEditRoute, onOpen: onEditeRoute, onOpenChange: onEditRouteChange } = useDisclosure();
   const [cursoId, setCursoId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [routeTitle, setRouteTitle] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [isLoadingSubjects, setLoadingSubjects] = useState(false);
  const [isLoadingRoutes, setLoadingRoutes] = useState(false);

  const loadSubjects = useCallback(
    debounce.debounce(async (searchTitle: string) => {
      setLoadingSubjects(true);
      const data = searchTitle
        ? await subjectService.getSubjectsByTitle(searchTitle)
        : await subjectService.getSubjects();
      setSubjects(data);
      setLoadingSubjects(false);
    }, 500), 
    []
  );

  const loadRoutes = useCallback(
    debounce.debounce(async (searchTitle: string) => {
      setLoadingRoutes(true);
      const data = searchTitle
        ? await routeService.getRouteByTitle(searchTitle)
        : await routeService.getAllRoutes();
      setRoutes(data);
      setLoadingRoutes(false);
    }, 500),
    []
  );

  useEffect(() => {
    loadSubjects(title);
    return () => loadSubjects.cancel();
  }, [title, loadSubjects]);

  useEffect(() => {
    loadRoutes(routeTitle);
    return () => loadRoutes.cancel();
  }, [routeTitle, loadRoutes]);
 

  return (
    <div className="w-full animate-fade-in-down flex flex-col gap-4">
        <Card>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl flex flex-row gap-2 items-center">Cursos <HiBookOpen className="w-5 h-5" opacity={0.5}/> </h1>
            <div className="flex flex-row gap-5">
              <Button color="primary" className="flex flex-row" onPress={onCreateModalOpen}> <HiPlus className="w-5 h-5"/> Agregar curso</Button>
              <Button color="primary" className="flex flex-row" onPress={onCreateSession}> <HiPlus className="w-5 h-5"/> Subir sesión</Button>
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
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por titulo" onChange={(e) => {setTitle(e.target.value)}} />
            </div>
          </div>

          { isLoadingSubjects ? (
                <div className="w-full h-[50vh] flex flex-row items-center justify-center">
                  <Spinner label="Cargando..." color="primary" labelColor="primary" className=""></Spinner>
                </div>
              )
              : (
              <Table>
                  <Table.Head>
                    <Table.HeadCell>uuid</Table.HeadCell>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Autor</Table.HeadCell>
                    <Table.HeadCell>Nivel</Table.HeadCell>
                    <Table.HeadCell>Fecha de creación</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
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
                        <Table.Cell>{curso.is_active ?  (<Chip variant="dot" color="success">Activado</Chip>)
                      : ( <Chip color="danger" variant="dot">Desactivado</Chip>)}</Table.Cell>
                        <Table.Cell>
                          <Button onPress={()=>{
                            setCursoId(curso._id);
                            onOpen();
                          }} className="font-mediu flex flex-row gap-2" color="primary">  
                            <HiPencil className="w-5 h-5" opacity={1}/> 
                            Editar
                          </Button>
                          
                        </Table.Cell>
                      </Table.Row>
                    ))}

                    {Array.from({ length: Math.max(0, MIN_ROWS - (subjects?.length || 0)) }).map((_, index) => (
                          <Table.Row key={`empty-${index}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell colSpan={7} className="text-center text-gray-500 py-4">
                              {}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                  </Table.Body>
                </Table>
              )}
          
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="full">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                <SubjectDetail subjectId={cursoId}/>
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

          <Modal isOpen={isCreateSession} onOpenChange={onCreateSessionChange} backdrop="blur" size="full">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                 <SessionCreate/>
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
              <input type="text" id="table" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por título" onChange={(e)=> {setRouteTitle(e.target.value)}}/>
            </div>
          </div>
          
          {isLoadingRoutes ? (
              <div className="w-full h-[50vh] flex flex-row items-center justify-center">
                <Spinner label="Cargando..." color="primary" labelColor="primary" className=""></Spinner>
              </div>
          ): (
            <Table>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Descripcion</Table.HeadCell>
              <Table.HeadCell>Fecha de creación</Table.HeadCell>
              <Table.HeadCell>Acción</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {routes?.map((ruta) => (
                <Table.Row key={ruta._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{ruta._id}</Table.Cell>
                  <Table.Cell>{ruta.title}</Table.Cell>
                  <Table.Cell>{ruta.description}</Table.Cell>
                  <Table.Cell>{ruta.created_at}</Table.Cell>
                  <Table.Cell>
                    <Button onPress={onEditeRoute} className="font-mediu flex flex-row gap-2" color="primary"><HiPencil className="w-5 h-5" opacity={0.5}/>  editar</Button>
                  </Table.Cell>
                </Table.Row>
              ))}

              {Array.from({ length: Math.max(0, MIN_ROWS - (routes?.length || 0)) }).map((_, index) => (
                  <Table.Row key={`empty-${index}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell colSpan={7} className="text-center text-gray-500 py-4">
                        {}
                    </Table.Cell>
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>
          )}         
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
