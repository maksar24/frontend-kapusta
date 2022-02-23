import { Fragment, useState, useEffect } from 'react';
import Media from 'react-media';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../../redux/auth/auth-selectors';
import { fetchSuccess, fetchError, summary } from '../../redux/balance/index';
import styles from './IncomeOutcomeButtons.module.css';

const IncomeOutcomeButtons = ({
  transactionType,
  setTransactionTypeIncome,
  setTransactionTypeConsumption,
  showMobileAddView,
}) => {
  const type = transactionType;

  const [outcomeActive, setOutcomeActive] = useState(true);
  const [incomeActive, setIncomeActive] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [thisYear, setThisYear] = useState(2022);
  const { data } = useSelector(data => data.balanceReducer);
  const [isLoading, setLoading] = useState(false);

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

  const setTransactionTypeConsumptionClick = () => {
    setTransactionTypeConsumption();
    showMobileAddView();
  };

  const setTransactionTypeIncomeClick = () => {
    setTransactionTypeIncome();
    showMobileAddView();
  };

  const fetchSummary = async type => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    if (type) {
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
    }
    return;
  };

  useEffect(() => {
    fetchSummary(type);
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
              <button
                className={styles.typeButton}
                type="button"
                onClick={setTransactionTypeConsumptionClick}
              >
                РАСХОД
              </button>

              <button
                className={styles.typeButton}
                type="button"
                onClick={setTransactionTypeIncomeClick}
              >
                ДОХОД
              </button>
            </div>
          )}
          {matches.medium && (
            <Fragment>
              <button
                className={`${styles.typeButton}
               ${type === 'consumption' && styles.isActive}`}
                type="button"
                onClick={(toggleActive, setTransactionTypeConsumption)}
              >
                РАСХОД
              </button>

              <button
                className={`${styles.typeButton}
               ${type === 'income' && styles.isActive}`}
                type="button"
                onClick={(toggleActive, setTransactionTypeIncome)}
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
