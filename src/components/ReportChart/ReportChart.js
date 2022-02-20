import s from './ReportChart.module.css';
import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSelector, useDispatch } from 'react-redux';

import { getToken } from '../../redux/auth/auth-selectors';
import {
  fetchSuccess,
  fetchError,
  sumDescription,
} from '../../redux/balance/index.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import BarChart from './BarChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels,
  Legend,
);

const ReportChart = ({ category, month, year }) => {
  const { data } = useSelector(data => data.balanceReducer);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  console.log(`category`, category);

  const fetchDescription = async () => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      setLoading(true);
      const response = await axios.get(
        `/transaction/category/${month + 1}/${year}/${category}`,
        config,
      );
      dispatch(fetchSuccess(response.data.sumByCategory));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(fetchError(error.message));
    }
  };

  useEffect(() => {
    fetchDescription();
  }, [category, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(sumDescription(data.sumDescription));
    }
  }, [isLoading]);

  return (
    <>
      <BarChart />
    </>
  );
};

export default ReportChart;
