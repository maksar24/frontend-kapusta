import React from 'react';
import s from './NoDataChartSection.module.css';

const NoDataChartSection = ({ title }) => {
  return (
    <div className={s.wrapper}>
      <p className={s.title}>{title}</p>
    </div>
  );
};

export default NoDataChartSection;
