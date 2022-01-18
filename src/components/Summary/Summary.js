import React, { useEffect } from 'react';
import styles from './Summary.module.css';
const Summary = () => {
  return (
    <div className={styles.summaryContainer}>
      <h4 className={styles.summaryTitle}>Сводка</h4>
      <ul className={styles.summaryList}>
        <li key="" className={styles.summaryItem}>
          <p className={styles.summaryDescription}></p>
        </li>
      </ul>
    </div>
  );
};
export default Summary;
