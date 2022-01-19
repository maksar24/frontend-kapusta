import React, { useState } from 'react';
import Container from '../../components/Container';
import LoginForm from '../../components/LogInForm';
import s from './HomePage.module.css';

const HomePageView = () => {
  const [setLogin] = useState(true);

  const onRegisterClick = () => {
    setLogin(false);
  };

  return (
    <section className={s.section}>
      <Container>
        <div className={s.mainWrapper}>
          <div className={s.textWrapper}>
            <h1 className={s.title}>smart finance</h1>
          </div>
          <div className={s.loginWrapper}>
            <LoginForm onClickRegister={onRegisterClick} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomePageView;
