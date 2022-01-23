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
    barWidth: 605,
    maxBarThickness: 38,
    showAllTooltips: true,
    plugins: {
      legend: {
        display: false,
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
        formatter: function (value, context) {
          return context.dataIndex + 'грн ' + Math.round(value) + 'грн';
        },
        // rotation: function (context) {
        //   var value = context.dataset.data[context.dataIndex];
        //   return value > 0 ? 45 : 180 - 45;
        // },
        // backgroundColor: function (context) {
        //   return context.dataset.backgroundColor;
        // },
        formatter: Math.round,
        padding: 10,
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
    layout: {
      padding: {
        top: 32,
        right: 15,
        bottom: 10,
        left: 15,
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
    <>
      <div className={s.chartSection}>
        <Bar options={{ ...options, indexAxis: axis }} data={data} />
      </div>
    </>
  );
};

export default ReportChart;
