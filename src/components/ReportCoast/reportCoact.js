import React, { useState, useEffect } from 'react';
import sprite from './sprite.svg';
import Icons from '../Icon';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, changeActive } from '../../redux/balance/index';
import { TailSpin } from 'react-loader-spinner';

import svg from './svg';

import s from './reportCoact.module.css';

export default function ReportCoast() {
  const [coast, setCoast] = useState(true);
  const dispatch = useDispatch();
  const { sumByCategoryConsumption, sumByCategoryIncome, active, isLoading } =
    useSelector(data => data.balanceReducer);

  useEffect(() => {
    if (coast && sumByCategoryConsumption) {
      dispatch(setCategory(sumByCategoryConsumption[0]?.group));
    }
    if (!coast && sumByCategoryIncome) {
      dispatch(setCategory(sumByCategoryIncome[0]?.group));
    }
  }, [coast, sumByCategoryConsumption, sumByCategoryIncome]);

  const coastOrIncome = () => {
    setCoast(coast => !coast);
    dispatch(changeActive(0));
  };

  const checkCategory = (e, i) => {
    dispatch(changeActive(i));
    dispatch(setCategory(e.currentTarget.value));
  };

  return (
    <div className={s.container}>
      {isLoading ? (
        <TailSpin color="#ff751d" />
      ) : (
        <>
          <div className={s.nav}>
            <button
              type="button"
              className={s.reportArrow}
              onClick={coastOrIncome}
            >
              <Icons iconName="leftArrow" />
            </button>
            <h2 className={s.reportTitle}>{coast ? 'Расходы' : 'Доходы'}</h2>
            <button
              type="button"
              className={s.reportArrow}
              onClick={coastOrIncome}
            >
              <Icons iconName="rightArrow" />
            </button>
          </div>
          <ul className={s.coastWrapper}>
            {coast ? (
              sumByCategoryConsumption?.length > 0 ? (
                sumByCategoryConsumption?.map((category, i) => {
                  return (
                    <li key={category?.group} className={s.card}>
                      <button
                        type="button"
                        className={s.cardButton}
                        value={category?.group}
                        onClick={e => checkCategory(e, i)}
                      >
                        <p className={s.cardTitle}>
                          {category.totalCategory}.00
                        </p>
                        <svg
                          className={i === active ? (s.svg, s.active) : s.svg}
                        >
                          <use href={sprite + '#' + category?.group} />
                        </svg>
                        <p className={s.cardTitle}>
                          {svg.coast[category?.group]}
                        </p>
                      </button>
                    </li>
                  );
                })
              ) : (
                <h3>За данный период нет рассходов</h3>
              )
            ) : sumByCategoryIncome?.length > 0 ? (
              sumByCategoryIncome?.map((category, i) => {
                return (
                  <li key={category?.group} className={s.card}>
                    <button
                      type="button"
                      className={s.cardButton}
                      value={category?.group}
                      onClick={e => checkCategory(e, i)}
                    >
                      <p className={s.cardTitle}>{category.totalCategory}.00</p>
                      <svg className={i === active ? (s.svg, s.active) : s.svg}>
                        <use href={sprite + '#' + category?.group} />
                      </svg>
                      <p className={s.cardTitle}>
                        {svg.income[category?.group]}
                      </p>
                    </button>
                  </li>
                );
              })
            ) : (
              <h3>За данный период нет доходов</h3>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
