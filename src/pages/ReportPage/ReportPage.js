import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ReportPage.module.css';
import DateField from '../../components/DateField';
import ReportCoast from '../../components/ReportCoast/reportCoact';
import { ReactComponent as GoBackArrow } from './GoBackArrow.svg';
import { ReactComponent as LeftArrow } from './LeftArrow.svg';
import { ReactComponent as RigthArrow } from './RigthArrow.svg';
import ReportChart from '../../components/ReportChart';
import Background from '../../components/Background/BackgroundReport/BackgroundReport';
import ReportWrapper from '../../components/ReportWrapper';

const ReportPage = () => {
  let navigate = useNavigate();
  const [thisMonth, setThisMonth] = useState(+new Date().getMonth());
  const [thisYear, setThisYear] = useState(2022);

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
          <GoBackArrow />
          <span className={s.button__name}>Вернуться на главную</span>
        </button>
        <div className={s.small__container}>
          <p className={s.date__description}>Текущий период:</p>
          <div className={s.datePicker__container}>
            <button className={s.datePicker__button} onClick={prevMonth}>
              <LeftArrow />
            </button>
            <DateField thisYear={thisYear} thisMonth={thisMonth} />
            <button className={s.datePicker__button} onClick={nextMonth}>
              <RigthArrow />
            </button>
          </div>
        </div>
      </div>
      <ReportWrapper>
        <ReportCoast />
      </ReportWrapper>
      <ReportWrapper>
        <ReportChart />
      </ReportWrapper>
    </Background>
  );
};

export default ReportPage;
