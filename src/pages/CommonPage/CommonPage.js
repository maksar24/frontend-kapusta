import React, { Fragment } from 'react';
import Media from 'react-media';
import s from './CommonPage.module.css';
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
import TransactionsTable from '../../components/TransactionsTable';

const CommonPage = () => {
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
            <BackgroundMobile>
              <Container>
                <CommonPageWrapper>
                  <SwitchToReport />
                  <Balance />
                  <IncomeOutcomeButtons />
                </CommonPageWrapper>
              </Container>
            </BackgroundMobile>
          )}
          {matches.medium && (
            <BackgroundReport>
              <CommonPageWrapper>
                <div className={s.balanceReportWrapper}>
                  <Balance />
                  <SwitchToReport />
                </div>
                <IncomeOutcomeButtons />
                <IncomeOutcomeForm />
                <TransactionsTable />
              </CommonPageWrapper>
            </BackgroundReport>
          )}
        </Fragment>
      )}
    </Media>
  );
};

export default CommonPage;
