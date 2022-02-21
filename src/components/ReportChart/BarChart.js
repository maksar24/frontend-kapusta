import s from './ReportChart.module.css';

import { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSelector, useDispatch } from 'react-redux';

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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const BarChart = () => {
  const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);
  const { width } = useWindowDimensions();

  const sumDescription = useSelector(data => data.balanceReducer);

  const optionsVertical = {
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
          // stepSize: 635,
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

  const optionsHorizontal = {
    barThickness: 15,
    maxBarThickness: 50,
    minBarLength: 90,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        offset: 12,
        borderRadius: 4,
        color: '#52555F',
        formatter: function (value) {
          return Math.round(value) + ' грн';
        },
        padding: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        display: true,
        ticks: {
          mirror: true,
          labelOffset: -20,
        },
      },
    },
    layout: {
      padding: {
        top: 5,
        bottom: 10,
        left: -5,
        right: 38,
      },
    },

    elements: {
      bar: {
        borderRadius: 10,
      },
    },
  };

  const options = width < 425 ? optionsHorizontal : optionsVertical;

  const labels = [];
  const amounts = [];

  {
    sumDescription.data.length > 0 &&
      sumDescription.data.forEach(item => {
        labels.push(item.group);
        amounts.push(item.totalDescription);
      });
  }

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
