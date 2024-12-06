import { Card } from "flowbite-react"
import {HiUser, HiUsers } from "react-icons/hi"
import { ResumeService } from "~/services/resume.service";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
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
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
  ],
};


export default function index() {
  const resumeService = new ResumeService();	
  const [accountsCreated, setAccountsCreated] = useState(0);
  const [teachersCreated, setTeachersCreated] = useState(0);
  const [usersSubscribed, setUsersSubscribed] = useState(0);
  const [usersWithScholarship, setUsersWithScholarship] = useState(0);

  const loadResume = async () => {
    try {
      const accountsResume = await resumeService.accountsResume();
      const teachersResume = await resumeService.teachersResume();
      const usersWithScholarshipResume = await resumeService.usersWithScholarshipResume();
      const usersSubscribedResume = await resumeService.usersSubscribedResume();
      setAccountsCreated(accountsResume.accountsCreated);
      setTeachersCreated(teachersResume.teachersCreated);
      setUsersSubscribed(usersSubscribedResume.usersSubscribed);
      setUsersWithScholarship(usersWithScholarshipResume.usersWithScholarship);
    } catch (error) {
      console.error("Error al cargar la información del resumen", error);
    }
  }

  useEffect(() => {
    loadResume();
  }, []);


  return (
    <div className="w-full animate-fade-in-down flex flex-col space-y-3">
      <h3 className="font-bold text-md">Resumen</h3>
      <div className="flex flex-row justify-between gap-6">
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cuentas creadas</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            {accountsCreated} <HiUsers className="h-5 w-5" opacity={0.5} />
          </p>
        </Card>
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Docentes registrados</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            {teachersCreated} <HiUser className="h-5 w-5" opacity={0.5} />
          </p>
        </Card>
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Suscritos</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            {usersSubscribed}<HiUser className="h-5 w-5" opacity={0.5} />
          </p>
        </Card>
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Becados</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            {usersWithScholarship} <HiUser className="h-5 w-5" opacity={0.5} />
          </p>
        </Card>
      </div>
      <h3 className="font-bold text-md">Ingresos por suscripción</h3>
      <div>
        <Card>
        <Bar options={options} data={data} />
        </Card>        
      </div>
    </div>
  )
}
