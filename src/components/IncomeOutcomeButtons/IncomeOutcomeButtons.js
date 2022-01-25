import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';

import styles from './IncomeOutcomeButtons.module.css';

const IncomeOutcomeButtons = () => {
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
            <Fragment>
              {' '}
              <button className={styles.outcomeButton} type="button">
                <NavLink
                  className={styles.outcomeLink}
                  to="/balance/addViaMobile"
                >
                  РАСХОД
                </NavLink>
              </button>
              <button className={styles.incomeButton} type="button">
                <NavLink
                  className={styles.incomeLink}
                  to="/balance/addViaMobile"
                >
                  ДОХОД
                </NavLink>
              </button>
            </Fragment>
          )}
          {matches.medium && (
            <Fragment>
              <button className={styles.outcomeButton} type="button">
                РАСХОД
              </button>

              <button className={styles.incomeButton} type="button">
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
