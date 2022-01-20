import React, { Fragment } from 'react';
import Media from 'react-media';
import s from './CommonPage.module.css';
import Container from '../../components/Container';
import SwitchToReport from '../../components/SwitchToReport';

const CommonPage = () => {
  return (
    <Container>
      <Media
        queries={{
          small: '(max-width: 767px)',
          medium: '(min-width: 768px)',
        }}
      >
        {matches => <Fragment>{matches.medium && <SwitchToReport />}</Fragment>}
      </Media>
    </Container>
  );
};

export default CommonPage;
