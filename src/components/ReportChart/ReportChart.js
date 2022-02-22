import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { getToken } from '../../redux/auth/auth-selectors';
import {
  fetchSuccess,
  fetchError,
  sumDescription,
} from '../../redux/balance/index.js';
import BarChart from './BarChart';

const ReportChart = ({ category, month, year }) => {
  const { data } = useSelector(data => data.balanceReducer);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const fetchDescription = async (category, month, year) => {
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
      dispatch(fetchSuccess(response.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(fetchError(error.message));
    }
  };

  useEffect(() => {
    fetchDescription(category, month, year);
  }, [category, month, year]);

  useEffect(() => {
    if (data) {
      dispatch(sumDescription(data.sumByCategory));
    }
  }, [isLoading]);

  return (
    <>
      <BarChart />
    </>
  );
};

export default ReportChart;
