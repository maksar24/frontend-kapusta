import s from './ReportChart.module.css';
// import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSelector, useDispatch } from 'react-redux';

// import { getToken } from '../../redux/auth/auth-selectors';
// import {
//   fetchSuccess,
//   fetchError,
//   sumDescriptionConsumption,
//   sumDescriptionIncome,
// } from '../../redux/balance/index';

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

const BarChart = () => {
  const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);

  const sumDescription = useSelector(data => data.balanceReducer);
  console.log('sumDescription', sumDescription);

  const options = {
    maxBarThickness: 38,
    indexAxis: 'x',
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

  const labels = [];
  const amounts = [];

  sumDescription?.forEach(item => {
    const labelIdx = labels.indexOf(item.group);
    if (labelIdx !== -1) {
      amounts[labelIdx] += item.totalDescription;
    } else {
      labels.push(item.group);
      amounts.push(item.totalDescription);
    }
  });

  console.log('labels', labels);
  console.log('amounts', amounts);

  const chartData = {
    labels: [...labels],
    datasets: [
      {
        data: [...amounts],
        backgroundColor: ['#FF751D', '#FFDAC0', '#FFDAC0'],
        borderWidth: 0,
      },
    ],
  };
  return (
    <>
      <div className={s.chartSection}>
        <Bar options={options} data={chartData} />
      </div>
    </>
  );
};

export default BarChart;
