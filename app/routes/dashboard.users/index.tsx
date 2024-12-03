/* eslint-disable react-hooks/exhaustive-deps */
import { MetaFunction } from "@remix-run/react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';
import { Card, Table } from "flowbite-react";
import { Line } from "react-chartjs-2";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import {HiUsers, HiPlus} from "react-icons/hi";
import UserDetail from "./userDetail";
import UserCreate from "./userCreate";
import { UserService } from "~/services/user.service";
import { User } from "~/models/user";
import { useCallback, useEffect, useState } from "react";
import  debounce  from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  color: 'white',
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Usuarios registrados en los ultimos meses',
      color: 'white'
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      color: 'white',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export const meta: MetaFunction = () => {
  return [
      {title: "Gestor de usuarios | Guimarbot administrativo"}
  ]
}


function Index() {
  const userService = new UserService();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onOpenChange: onCreateModalChange } = useDisclosure();
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState<string>("");
  const [isLoadingUsers, setLoadingUsers] = useState(false);

  const loadUsers = useCallback(
    debounce.debounce(async (useSearch:string) => {
      setLoadingUsers(true);
      const data = useSearch
      ? await userService.getUserByUsername(useSearch)
      : await userService.getUsers();
      setUsers(data);
      setLoadingUsers(false);
    }, 500),
    []
  )

  useEffect(() => {
    loadUsers(userSearch);
    return () => {loadUsers.cancel()}
  }, [userSearch, loadUsers]);

  return (
    <div className="w-full animate-fade-in-down flex flex-col gap-4">
        <Card>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl flex flex-row gap-2 items-center">Usuarios <HiUsers className="w-5 h-5" opacity={0.5}/> </h1>
            <div className="flex flex-row">
              <Button color="primary" className="flex flex-row" onPress={onCreateModalOpen}> <HiPlus className="w-5 h-5"/> Agregar usuario</Button>
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
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por usuario" onChange={(e) => {setUserSearch(e.target.value)}} />
            </div>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellido</Table.HeadCell>
              <Table.HeadCell>Usuario</Table.HeadCell>
              <Table.HeadCell>Fecha de Nacimiento</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Rol</Table.HeadCell>
              <Table.HeadCell>
                Acción
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((usuario) => (
                <Table.Row key={usuario._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{usuario.first_name}</Table.Cell>
                  <Table.Cell>{usuario.last_name}</Table.Cell>
                  <Table.Cell>{usuario.username}</Table.Cell>
                  <Table.Cell>{usuario.birthdate}</Table.Cell>
                  <Table.Cell>{usuario.email}</Table.Cell>
                  <Table.Cell>{usuario.role}</Table.Cell>
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
                  <UserDetail/>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal isOpen={isCreateModalOpen} onOpenChange={onCreateModalChange} backdrop="blur" size="5xl">
            <ModalContent className="bg-[#111827]" >
              { () =>(
                <>
                  <UserCreate/>
                </>
              )}
            </ModalContent>
          </Modal>
          </div>
        </Card>
        <Card>
          <Line options={options} data={data} />
        </Card>
    </div>
  )
}

export default Index