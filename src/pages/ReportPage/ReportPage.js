import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import Media from 'react-media';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './ReportPage.module.css';
import DateField from '../../components/DateField';
import ReportCoast from '../../components/ReportCoast/reportCoact';
import Icons from '../../components/Icon';
import ReportChart from '../../components/ReportChart';
import Background from '../../components/Background/BackgroundReport/BackgroundReport';
import ReportWrapper from '../../components/ReportWrapper';

import ReportBalance from '../../components/ReportBalance/ReportBalance';
import {
  fetchSuccess,
  fetchError,
  filteredData,
} from '../../redux/balance/index';
import ReportChartMobile from '../../components/ReportChart/ReportChartMobile';

const ReportPage = () => {
  let navigate = useNavigate();
  const [thisMonth, setThisMonth] = useState(+new Date().getMonth());
  const [thisYear, setThisYear] = useState(2022);
  const { data, filteredData, error, isLoading } = useSelector(
    data => data.balanceReducer,
  );
  const dispatch = useDispatch();

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

  return (
    <Background>
      <div className={s.container}>
        <button className={s.button__back} onClick={handleClick}>
          <Icons iconName="goArrow" />
          <span className={s.button__name}>Вернуться на главную</span>
        </button>
        <div className={s.small__container}>
          <p className={s.date__description}>Текущий период:</p>
          <div className={s.datePicker__container}>
            <button className={s.datePicker__button} onClick={prevMonth}>
              <Icons iconName="leftArrow" />
            </button>
            <DateField thisYear={thisYear} thisMonth={thisMonth} />
            <button className={s.datePicker__button} onClick={nextMonth}>
              <Icons iconName="rightArrow" />
            </button>
          </div>
        </div>
      </div>
      <ReportWrapper>
        <ReportBalance />
      </ReportWrapper>
      <ReportWrapper>
        <ReportCoast />
      </ReportWrapper>
      <Media
        queries={{
          small: '(max-width: 767px)',
          medium: '(min-width: 768px)',
        }}
      >
        {matches => (
          <Fragment>
            {matches.small && (
              <ReportWrapper>
                <ReportChartMobile />
              </ReportWrapper>
            )}
            {matches.medium && (
              <ReportWrapper>
                <ReportChart />
              </ReportWrapper>
            )}
          </Fragment>
        )}
      </Media>
    </Background>
  );
};

export default ReportPage;
