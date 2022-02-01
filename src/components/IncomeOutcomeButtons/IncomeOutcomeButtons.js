import { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';

import styles from './IncomeOutcomeButtons.module.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../../redux/auth/auth-selectors';

import { fetchSuccess, fetchError, summary } from '../../redux/balance/index';

const IncomeOutcomeButtons = () => {
  const [outcomeActive, setOutcomeActive] = useState(false);
  const [incomeActive, setIncomeActive] = useState(true);
  const [type, setType] = useState('income');
  const [thisYear, setThisYear] = useState(2022);
  const { data } = useSelector(data => data.balanceReducer);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const toggleActive = () => {
    if (incomeActive) {
      setOutcomeActive(true);
      setIncomeActive(false);
      setType(`consumption`);
      return;
    }

    if (outcomeActive) {
      setIncomeActive(true);
      setOutcomeActive(false);
      setType(`income`);
    }
  };

  const fethSummary = async type => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      setLoading(true);
      const response = await axios.get(
        `/transaction/summary/${type}/${thisYear}`,
        config,
      );
      dispatch(fetchSuccess(response.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(fetchError(error.message));
    }
  };

  useEffect(() => {
    fethSummary(type);
  }, [thisYear, type, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(summary(data.summary));
    }
  }, [isLoading]);

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
