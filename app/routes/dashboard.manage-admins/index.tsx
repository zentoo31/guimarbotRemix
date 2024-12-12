/* eslint-disable react-hooks/exhaustive-deps */
import { MetaFunction } from "@remix-run/react"
import { Card, Table } from "flowbite-react";
import { Button, Modal, ModalContent, useDisclosure, Spinner } from "@nextui-org/react";
import { HiPlus, HiKey, HiPencil} from "react-icons/hi";
import AdminDetail from "./adminDetail";
import AdminCreate from "./adminCreate";
import { AdminService } from "~/services/admins.service";
import { AdminLogsService } from "~/services/admin.logs.service";
import { useState, useEffect, useCallback } from "react";
import { Admin } from "~/models/admin";
import { AuthLog } from "~/models/authLog";
import moment from "moment";
import  debounce  from "lodash";

export const meta: MetaFunction = () => {
  return [
      {title: "Gestor de administradores | Guimarbot administrativo"}
  ]
}

function Index() {
  const MIN_ROWS = 15;
  const adminService = new AdminService();
  const adminLogsService = new AdminLogsService();
  const [search, setSearch] = useState<string>("");
  const [searchAuthLogs, setSearchAuthLogs] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAuthLogs, setLoadingAuthLogs] = useState<boolean>(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [adminID, setAdminID] = useState<string>("");
  const [authLogs, setAuthLogs] = useState<AuthLog[]>([]);
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onOpenChange: onCreateModalChange } = useDisclosure();

  const loadAllAdminLogs = useCallback(
    debounce.debounce(async (search:string) => {
    setLoadingAuthLogs(true);
    const data = search 
      ? await adminLogsService.getAuthLogsByUsername(search)
      : await adminLogsService.getAllAuthLogs();
    setAuthLogs(data);
    console.log(data);
    
    setLoadingAuthLogs(false);
  }, 500), [] );


  const loadAdmins = useCallback(
    debounce.debounce(async (search: string) => {
      setLoading(true);
      const data = search 
        ? await adminService.getAdminsByUsername(search)
        : await adminService.getAllAdmins();
      setAdmins(data);
      setLoading(false);
    }, 500),
    []
  );


  useEffect(() => {
    loadAdmins(search);
    return () => {
      loadAdmins.cancel();
    }
  }, [search, loadAdmins]);

  
  useEffect(() => {
    loadAllAdminLogs(searchAuthLogs);
    return () => {
      loadAllAdminLogs.cancel();
    }
  }, [searchAuthLogs, loadAllAdminLogs]);


  return (
    <div className="w-full animate-fade-in-down flex flex-col gap-4 h-auto">
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
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por usuario" onChange={(e) => {setSearch(e.target.value)}} />
            </div>
          </div>
          {loading ? (
            <div className="w-full h-[50vh] flex flex-row items-center justify-center">
              <Spinner label="Cargando..." color="primary" labelColor="primary" className=""></Spinner>
            </div>
          ): ( 
            <Table>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellido</Table.HeadCell>
              <Table.HeadCell>Usuario</Table.HeadCell>
              <Table.HeadCell>Rol</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {admins.map((admin) => (
                <Table.Row key={admin._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell >{admin._id}</Table.Cell>
                  <Table.Cell>{admin.first_name}</Table.Cell>
                  <Table.Cell>{admin.last_name}</Table.Cell>
                  <Table.Cell>{admin.username}</Table.Cell>
                  <Table.Cell>{admin.role}</Table.Cell>
                  <Table.Cell>{admin.email}</Table.Cell>
                  <Table.Cell>
                    <Button onPress={
                      () => {
                        setAdminID(admin._id || "");
                        onOpen();
                      }
                    } 
                    className="font-mediu" color="primary"><HiPencil className="w-5 h-5" opacity={1}/> Editar</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
              {Array.from({ length: Math.max(0, MIN_ROWS - (admins?.length || 0)) }).map((_, index) => (
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
                <AdminDetail adminID={adminID}/>
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
        <Card>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl flex flex-row gap-2 items-center">Logs de Autenticación de Admins <HiKey className="w-5 h-5" opacity={0.5}/> </h1>
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
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por usuario" onChange={(e) => {setSearchAuthLogs(e.target.value)}} />
            </div>
          </div>
          {loadingAuthLogs ? (
            <div className="w-full h-[50vh] flex flex-row items-center justify-center">
              <Spinner label="Cargando..." color="primary" labelColor="primary" className=""></Spinner>
            </div>
          ): ( 
            <Table>
            <Table.Head>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Dirección IP</Table.HeadCell>
              <Table.HeadCell>Navegador</Table.HeadCell>
              <Table.HeadCell>SO</Table.HeadCell>
              <Table.HeadCell>¿Celular?</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {authLogs.map((log) => (
                <Table.Row key={log._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{log._id}</Table.Cell>
                  <Table.Cell>{log.ip_address}</Table.Cell>
                  <Table.Cell>{log.browser}</Table.Cell>
                  <Table.Cell>{log.os}</Table.Cell>
                  <Table.Cell>{log.is_mobile}</Table.Cell>
                  <Table.Cell>{moment(log.date).local().format('D [de] MMMM [de] YYYY, HH:mm')}</Table.Cell>
                </Table.Row>
              ))}
              {Array.from({ length: Math.max(0, MIN_ROWS - (authLogs?.length || 0)) }).map((_, index) => (
                          <Table.Row key={`empty-${index}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell colSpan={7} className="text-center text-gray-500 py-4">
                              {}
                            </Table.Cell>
                          </Table.Row>
                        ))}
            </Table.Body>
          </Table>
          )}
          
          </div>
        </Card>
    </div>
  )
}

export default Index