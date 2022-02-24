import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';

import s from './CommonPage.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import * as selectors from '../../redux/transactions/transactionsSelectors';
import transactionsOperations from '../../redux/transactions/transactionsOperations';

import Container from '../../components/Container';
import SwitchToReport from '../../components/SwitchToReport';
import Balance from '../../components/Balance';
import {
  BackgroundMobile,
  BackgroundReport,
} from '../../components/Background';
import IncomeOutcomeForm from '../../components/IncomeOutcomeForm';
import IncomeOutcomeButtons from '../../components/IncomeOutcomeButtons';
import CommonPageWrapper from '../../components/CommonPageWrapper';
import {
  TransactionsTable,
  MobileTable,
} from '../../components/TransactionsTable';
import ShowDate from '../../components/Date';
import Summary from '../../components/Summary';
import AddTransactionView from '../../views/AddTransactionView';
import summaryOperations from '../../redux/summary/summaryOperations';

const CommonPage = () => {
  const dispatch = useDispatch();
  const [thisYear, setThisYear] = useState(2022);

  const [mobileAddView, setMobileAddView] = useLocalStorage(
    'mobileAddView',
    false,
  );
  const transactions = useSelector(selectors.getTransactions);

  const showMobileAddView = () => {
    if (!mobileAddView) {
      setMobileAddView(true);
      return;
    }

    setMobileAddView(false);
  };

  /* const [transactionType, setTransactionType] = useLocalStorage(
    'type',
    'consumption',
  ); */
  const [transactionType, setTransactionType] = useState('consumption');

  const setTransactionTypeIncome = () => {
    if (transactionType === 'consumption') {
      setTransactionType('income');

      return;
    }
    if (transactionType === 'income') {
      return;
    }
  };

  const setTransactionTypeConsumption = () => {
    if (transactionType === 'income') {
      setTransactionType('consumption');

      return;
    }
    if (transactionType === 'consumption') {
      return;
    }
  };
  useEffect(() => {
    /* setTransactionType('consumption'); */
    dispatch(transactionsOperations.getTransactions());
    dispatch(summaryOperations.getSummary(transactionType, thisYear));
  }, [transactionType, dispatch]);

  console.log(transactionType);
  return (
    <Media
      queries={{
        small: '(max-width: 767px)',
        medium: '(min-width: 768px) and (max-width: 1279px)',
        large: '(min-width: 1280px)',
      }}
    >
      {matches => (
        <Fragment>
          {matches.small && (
            <>
              {mobileAddView && transactions ? (
                <>
                  <AddTransactionView
                    showMobileAddView={showMobileAddView}
                    transactionType={transactionType}
                    setTransactionTypeIncome={setTransactionTypeIncome}
                    setTransactionTypeConsumption={
                      setTransactionTypeConsumption
                    }
                  />
                </>
              ) : (
                <Fragment>
                  <BackgroundMobile>
                    <Container>
                      <CommonPageWrapper>
                        <SwitchToReport />
                        <Balance />
                        <ShowDate />
                        <MobileTable />
                      </CommonPageWrapper>
                    </Container>
                  </BackgroundMobile>
                  <IncomeOutcomeButtons
                    setTransactionTypeIncome={setTransactionTypeIncome}
                    setTransactionTypeConsumption={
                      setTransactionTypeConsumption
                    }
                    showMobileAddView={showMobileAddView}
                  />
                </Fragment>
              )}
            </>
          )}
          {matches.medium && (
            <BackgroundReport>
              <CommonPageWrapper>
                <div className={s.balanceReportWrapper}>
                  <Balance />
                  <SwitchToReport />
                </div>
                <IncomeOutcomeButtons
                  setTransactionTypeIncome={setTransactionTypeIncome}
                  setTransactionTypeConsumption={setTransactionTypeConsumption}
                  transactionType={transactionType}
                />
                <div className={s.bigWrapper}>
                  <div className={s.dateFormWrapper}>
                    <ShowDate />
                    <IncomeOutcomeForm transactionType={transactionType} />
                  </div>
                  <TransactionsTable transactionType={transactionType} />
                </div>
                <Summary />
              </CommonPageWrapper>
            </BackgroundReport>
          )}
          {matches.large && (
            <BackgroundReport>
              <CommonPageWrapper>
                <div className={s.balanceReportWrapper}>
                  <Balance />
                  <SwitchToReport />
                </div>
                <IncomeOutcomeButtons
                  setTransactionTypeIncome={setTransactionTypeIncome}
                  setTransactionTypeConsumption={setTransactionTypeConsumption}
                  transactionType={transactionType}
                />
                <div className={s.bigWrapper}>
                  <div className={s.dateFormWrapper}>
                    <ShowDate />
                    <IncomeOutcomeForm transactionType={transactionType} />
                  </div>
                  <div className={s.tableSummaryWrapper}>
                    <TransactionsTable transactionType={transactionType} />
                    <Summary />
                  </div>
                </div>
              </CommonPageWrapper>
            </BackgroundReport>
          )}
        </Fragment>
      )}
    </Media>
  );
};

export default CommonPage;
