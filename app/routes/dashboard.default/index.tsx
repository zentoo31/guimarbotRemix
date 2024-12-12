/* eslint-disable react-hooks/rules-of-hooks */
import { Card } from "flowbite-react"
import { ResumeService } from "~/services/resume.service";
import { useState, useEffect } from "react";
import { HiUser, HiUsers } from "react-icons/hi"
import { Doughnut,Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Ingresos por suscripción',
    },
  },
};

export default function index() {
  const resumeService = new ResumeService();	
  const [accountsCreated, setAccountsCreated] = useState(0);
  const [teachersCreated, setTeachersCreated] = useState(0);
  const [usersSubscribed, setUsersSubscribed] = useState(0);
  const [usersWithScholarship, setUsersWithScholarship] = useState(0);

  const data = {
    labels: ['Cuentas creadas', 'Docentes registrados'],
    datasets: [
      {
        label: 'Resumen',
        data: [accountsCreated, teachersCreated],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(153, 102, 255)'
        ],
        hoverOffset: 4,
      },
    ],
  };

    const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Dataset 2',
        data: [50, 100, 150, 200, 250, 300, 350],
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
    };


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
      <div className="flex gap-6">
        <Card className="w-full max-w-lg">
          <Doughnut options={options} data={data} />
        </Card>
        <Card className="w-full max-w-x1">
          <Bar options={options} data={barData} />
        </Card>
      </div>
    </div>
  )
}
