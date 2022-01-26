import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';

import styles from './IncomeOutcomeButtons.module.css';

const IncomeOutcomeButtons = () => {
  const [outcomeActive, setOutcomeActive] = useState(true);
  const [incomeActive, setIncomeActive] = useState(false);

  const toggleActive = () => {
    if (incomeActive) {
      setOutcomeActive(true);
      setIncomeActive(false);
      return;
    }

    if (outcomeActive) {
      setIncomeActive(true);
      setOutcomeActive(false);
    }
  };

  return (
    <Media
      queries={{
        small: '(max-width: 767px)',
        medium: '(min-width: 768px)',
      }}
    >
      {matches => (
        <Fragment>
          {matches.small && (
            <div className={styles.incomeOutcomeButtons}>
              <button className={styles.typeButton} type="button">
                <NavLink className={styles.typeLink} to="/balance/addViaMobile">
                  РАСХОД
                </NavLink>
              </button>

              <button className={styles.typeButton} type="button">
                <NavLink className={styles.typeLink} to="/balance/addViaMobile">
                  ДОХОД
                </NavLink>
              </button>
            </div>
          )}
          {matches.medium && (
            <Fragment>
              <button
                className={`${styles.typeButton}
               ${outcomeActive && styles.isActive}`}
                type="button"
                onClick={toggleActive}
              >
                РАСХОД
              </button>

              <button
                className={`${styles.typeButton}
               ${incomeActive && styles.isActive}`}
                type="button"
                onClick={toggleActive}
              >
                ДОХОД
              </button>
            </Fragment>
          )}
        </Fragment>
      )}
    </Media>
  );
};

export default IncomeOutcomeButtons;
