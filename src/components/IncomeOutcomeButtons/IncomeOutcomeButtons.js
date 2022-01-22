import { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import IncomeOutcomeForm from '../IncomeOutcomeForm';

import styles from './IncomeOutcomeButtons.module.css';

const IncomeOutcomeButtons = () => {
  const [state, setState] = useState('');

  const handleClick = state => {
    setState(state);
  };

  return (
    <Fragment>
      <button
        className={styles.outcomeButton}
        type="button"
        onClick={handleClick('outcome')}
      >
        <NavLink className={styles.outcomeLink} to="/balance/addViaMobile">
          РАСХОД
        </NavLink>
      </button>

      <button
        className={styles.incomeButton}
        type="button"
        onClick={handleClick('income')}
      >
        <NavLink className={styles.incomeLink} to="/balance/addViaMobile">
          ДОХОД
        </NavLink>
      </button>
    </Fragment>
  );
};

export default IncomeOutcomeButtons;
