import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Card } from 'flowbite-react';
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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Usuarios / Suscriptores',
        color: 'white'
      },
    },
};

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

export const data = {
    labels,
    datasets: [
      {
        label: 'Usuarios',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        text: 'white'
      },
      {
        label: 'Suscriptores',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        text: 'white'
      },
    ],
};

function Index() {
  return (
    <div className="w-full flex flex-col animate-fade-in-down">
        <h1 className='font-bold text-xl'>Usuarios y suscriptores en los meses</h1>
        <Card>
            <Bar options={options} data={data} style={{ width: '400px', height: '300px' }}/>
        </Card>
        <h1 className='font-bold text-xl'>Usuarios y suscriptores en los meses</h1>
        <Card>
            <Bar options={options} data={data} style={{ width: '400px', height: '300px' }}/>
        </Card>
        <h1 className='font-bold text-xl'>Usuarios y suscriptores en los meses</h1>
        <Card>
            <Bar options={options} data={data} style={{ width: '400px', height: '300px' }}/>
        </Card>
    </div>
  )
}

export default Index