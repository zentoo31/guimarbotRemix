import { Card } from "flowbite-react"
import { HiUser, HiUsers } from "react-icons/hi"
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
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

const data = {
  labels: ['Cuentas creadas', 'Docentes registrados', 'Suscritos', 'Becados'],
  datasets: [
    {
      label: 'Resumen',
      data: [2200, 1000, 1000, 200],
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

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Ingresos por suscripción',
    },
  },
};

export default function index() {
  return (
    <div className="w-full animate-fade-in-down flex flex-col space-y-3">
      <h3 className="font-bold text-md">Resumen</h3>
      <div className="flex flex-row justify-between gap-6">
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cuentas creadas</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            2,200 <HiUsers className="h-5 w-5" opacity={0.5} />
          </p>
        </Card>
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Docentes registrados</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            1,000 <HiUser className="h-5 w-5" opacity={0.5} />
          </p>
        </Card>
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Suscritos</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            1,000 <HiUser className="h-5 w-5" opacity={0.5} />
          </p>
        </Card>
        <Card className="flex-grow max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Becados</h5>
          <p className="text-gray-700 dark:text-gray-400 flex flex-row gap-2">
            200 <HiUser className="h-5 w-5" opacity={0.5} />
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
