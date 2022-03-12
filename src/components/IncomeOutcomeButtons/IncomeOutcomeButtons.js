import { Fragment, useState } from 'react';
import Media from 'react-media';
import { useDispatch } from 'react-redux';
import summaryOperations from '../../redux/summary/summaryOperations';
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

  const [thisYear, setThisYear] = useState(2022);

  const toggleActive = () => {
    if (incomeActive) {
      setOutcomeActive(true);
      setIncomeActive(false);
      dispatch(summaryOperations.getSummary(type, thisYear));
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
