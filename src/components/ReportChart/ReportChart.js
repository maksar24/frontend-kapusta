import s from './ReportChart.module.css';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ReportChart = () => {
  const [axis, setAxis] = useState('x');

  const options = {
    barWidth: 605,
    maxBarThickness: 38,
    showAllTooltips: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false, //this will remove only the label
          },
        },
      ],
      y: {
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setAxis(window.matchMedia('(max-width: 767px)').matches ? 'y' : 'x');
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const labels = [
    'Свинина',
    'Говядина',
    'Курица',
    'Рыба',
    'Панини',
    'Кофе',
    'Спагетти',
    'Шоколад',
    'Маслины',
    'Зелень',
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [
          '5000',
          '4500',
          '3200',
          '2100',
          '1800',
          '1700',
          '1500',
          '800',
          '500',
          '300',
        ],
        backgroundColor: ['#FF751D', '#FFDAC0', '#FFDAC0'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={s.chartSection}>
      <Bar options={{ ...options, indexAxis: axis }} data={data} />
    </div>
  );
};

export default ReportChart;
