import React, { useState } from 'react';
import sprite from './sprite.svg';
import { ReactComponent as LeftArrow } from '../../pages/ReportPage/LeftArrow.svg';
import { ReactComponent as RigthArrow } from '../../pages/ReportPage/RigthArrow.svg';

import svg from './svg';

import s from './reportCoact.module.css';
export default function ReportCoast() {
  const [coast, setCoast] = useState(true);
  const coastOrIncome = () => {
    setCoast(coast => !coast);
  };
  return (
    <div className={s.container}>
      <div className={s.nav}>
        <button type="button" className={s.reportArrow} onClick={coastOrIncome}>
          <LeftArrow />
        </button>
        <h2 className={s.reportTitle}>{coast ? 'Расходы' : 'Доходы'}</h2>
        <button type="button" className={s.reportArrow} onClick={coastOrIncome}>
          <RigthArrow />
        </button>
      </div>
      <ul>
        {coast
          ? svg.coast.map(svg => {
              return (
                <li key={Object.keys(svg)[0]} className={s.card}>
                  <button type="button" className={s.cardButton}>
                    <p className={s.cardTitle}>1000.00</p>
                    <svg className={s.svg}>
                      <use href={sprite + '#' + Object.keys(svg)[0]} />
                    </svg>
                    <p className={s.cardTitle}>{Object.values(svg)[0]}</p>
                  </button>
                </li>
              );
            })
          : svg.income.map(svg => {
              return (
                <li key={Object.keys(svg)[0]} className={s.card}>
                  <button type="button" className={s.cardButton}>
                    <p className={s.cardTitle}>1000.00</p>
                    <svg className={s.svg}>
                      <use href={sprite + '#' + Object.keys(svg)[0]} />
                    </svg>
                    <p className={s.cardTitle}>{Object.values(svg)[0]}</p>
                  </button>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
