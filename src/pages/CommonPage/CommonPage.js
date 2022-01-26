import React, { Fragment } from 'react';
import Media from 'react-media';
import s from './CommonPage.module.css';
import Container from '../../components/Container';
import SwitchToReport from '../../components/SwitchToReport';
import Balance from '../../components/Balance';
import { BackgroundMobile } from '../../components/Background';
import IncomeOutcomeButtons from '../../components/IncomeOutcomeButtons';
import CommonPageWrapper from '../../components/CommonPageWrapper';
import Background from '../../components/Background/BackgroundReport/BackgroundReport';

const CommonPage = () => {
  return (
    <Background>
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
              <>
                <div className={s.container_balance}>
                  <Balance />
                  <SwitchToReport />
                </div>
              </>
            )}
          </Fragment>
        )}
      </Media>
    </Background>
  );
};

export default CommonPage;
