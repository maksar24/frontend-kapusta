import React from 'react';
import styles from './Summary.module.css';

import { useSelector } from 'react-redux';
import monthData from '../../data/month.json';
import * as selectors from '../../redux/summary/summarySelectors';

const Summary = () => {
  const summary = useSelector(selectors.getSum);

  return (
    <div className={styles.summaryContainer}>
      <h4 className={styles.summaryTitle}>Сводка</h4>
      <ul className={styles.summaryList}>
        {summary &&
          summary
            .filter(item => item.value > 0)
            .map(({ monthIdex, value }) => (
              <li key={monthIdex} className={styles.summaryItem}>
                <p className={styles.summaryDescription}>
                  {monthData.find(monthIDd => monthIDd.id === monthIdex).name}
                </p>
                <p className={styles.summaryDescription}>
                  {value.toLocaleString()}.00
                </p>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Summary;
