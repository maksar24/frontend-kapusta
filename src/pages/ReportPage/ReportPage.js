import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Media from 'react-media';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './ReportPage.module.css';
import DateField from '../../components/DateField';
import ReportCoast from '../../components/ReportCoast/reportCoact';
import Icons from '../../components/Icon';
import ReportChart from '../../components/ReportChart';
import { BackgroundReport } from '../../components/Background';
import ReportWrapper from '../../components/ReportWrapper';
import { getToken } from '../../redux/auth/auth-selectors';
import Balance from '../../components/Balance';
import ReportBalance from '../../components/ReportBalance/ReportBalance';
import NoDataChartSection from '../../components/NoDataChartSection/NoDataChartSection';

import {
  fetchSuccess,
  fetchError,
  sumByCategoryIncome,
  sumByCategoryConsumption,
  clearChartData,
  incomeData,
  consumptionData,
} from '../../redux/balance/index';

const ReportPage = () => {
  let navigate = useNavigate();
  const [thisMonth, setThisMonth] = useState(new Date().getMonth());
  const [thisYear, setThisYear] = useState(2022);
  const { data } = useSelector(data => data.balanceReducer);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { category } = useSelector(data => data.balanceReducer);

  const fetchData = async () => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      setLoading(true);
      const response = await axios.get(
        `/transaction/report/${thisYear}/${thisMonth + 1}`,
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
    fetchData();
  }, [thisMonth, thisYear, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(sumByCategoryIncome(data.sumByCategoryIncome));
      dispatch(sumByCategoryConsumption(data.sumByCategoryConsumption));
      dispatch(incomeData(data.income));
      dispatch(consumptionData(data.consumption));
    }
  }, [isLoading]);

  function handleClick() {
    navigate('/');
  }

  const nextMonth = () => {
    setThisMonth(thisMonth + 1);
    if (thisMonth === 11) {
      setThisMonth(0);
      setThisYear(thisYear + 1);
    }
  };

  const prevMonth = () => {
    setThisMonth(thisMonth - 1);
    if (thisMonth === 0) {
      setThisMonth(11);
      setThisYear(thisYear - 1);
    }
  };
  const clearPrevDataMonth = () => {
    dispatch(clearChartData());
    prevMonth();
  };
  const clearNextDataMonth = () => {
    dispatch(clearChartData());
    nextMonth();
  };
  return (
    <BackgroundReport>
      <div className={s.container}>
        <button className={s.button__back} onClick={handleClick}>
          <Icons iconName="goArrow" />
          <span className={s.button__name}>Вернуться на главную</span>
        </button>
        <Media
          queries={{
            small: '(max-width: 767px)',
            medium: '(min-width: 768px)',
          }}
        >
          {matches => (
            <Fragment>
              {matches.small && (
                <>
                  <div className={s.small__container}>
                    <p className={s.date__description}>Текущий период:</p>
                    <div className={s.datePicker__container}>
                      <button
                        className={s.datePicker__button}
                        onClick={clearPrevDataMonth}
                      >
                        <Icons iconName="leftArrow" />
                      </button>
                      <DateField thisYear={thisYear} thisMonth={thisMonth} />
                      <button
                        className={s.datePicker__button}
                        onClick={clearNextDataMonth}
                      >
                        <Icons iconName="rightArrow" />
                      </button>
                    </div>
                  </div>
                  <Balance hide={s.button__balance} style={s.balance__style} />
                </>
              )}
              {matches.medium && (
                <>
                  <Balance hide={s.button__balance} />
                  <div className={s.small__container}>
                    <p className={s.date__description}>Текущий период:</p>
                    <div className={s.datePicker__container}>
                      <button
                        className={s.datePicker__button}
                        onClick={clearPrevDataMonth}
                      >
                        <Icons iconName="leftArrow" />
                      </button>
                      <DateField thisYear={thisYear} thisMonth={thisMonth} />
                      <button
                        className={s.datePicker__button}
                        onClick={clearNextDataMonth}
                      >
                        <Icons iconName="rightArrow" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Fragment>
          )}
        </Media>
      </div>
      <ReportWrapper>
        <ReportBalance />
      </ReportWrapper>
      <ReportWrapper>
        <ReportCoast />
      </ReportWrapper>
      <ReportWrapper>
        <ReportChart category={category} year={thisYear} month={thisMonth} />
      </ReportWrapper>
    </BackgroundReport>
  );
};

export default ReportPage;
