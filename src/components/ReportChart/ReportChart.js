import s from './ReportChart.module.css';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  ChartDataLabels,
  Legend,
);

const ReportChart = () => {
  const [axis, setAxis] = useState('x');

  const options = {
    maxBarThickness: 38,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        align: function (context) {
          var value = context.dataset.data[context.dataIndex];
          return value > 0 ? 'end' : 'start';
        },
        anchor: function (context) {
          var value = context.dataset.data[context.dataIndex];
          return value > 0 ? 'end' : 'start';
        },
        borderRadius: 4,
        color: '#52555F',
        formatter: function (value) {
          return Math.round(value) + ' грн';
        },
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          lineWidth: 2,
          drawBorder: false,
          color: '#F5F6FB',
        },
        ticks: {
          display: false,
          stepSize: 100,
        },
      },
      y: {
        grid: {
          lineWidth: 2,
          drawBorder: false,
          drawTicks: false,
          color: '#F5F6FB',
        },
        display: true,
        ticks: {
          display: false,
          stepSize: 635,
        },
      },
    },
    layout: {
      padding: {
        top: 35,
        bottom: 0,
      },
    },
    elements: {
      bar: {
        barWidth: 605,
        borderRadius: 10,
      },
    },
  };
  // useEffect(() => {
  //   const handleResize = () => {
  //     setAxis(window.matchMedia('(max-width: 767px)').matches ? 'y' : 'x');
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

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
    <>
      <div className={s.chartSection}>
        <Bar options={{ ...options, indexAxis: axis }} data={data} />
      </div>
    </>
  );
};

export default ReportChart;
