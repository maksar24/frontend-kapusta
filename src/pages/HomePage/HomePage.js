import React, { useState } from 'react';
import Container from '../../components/Container';
import LoginForm from '../../components/LogInForm';
import RegistrationForm from '../../components/RegistrationForm';
import s from './HomePage.module.css';

const HomePageView = () => {
  const [login, setLogin] = useState(true);

  const onRegisterClick = () => {
    setLogin(false);
  };

  const onComeBackClick = () => {
    setLogin(true);
  };

  return (
    <section className={s.section}>
      <Container>
        <div className={s.mainWrapper}>
          <div className={s.textWrapper}>
            <h1 className={s.title}>smart finance</h1>
          </div>
          <div className={s.loginWrapper}>
            {login ? (
              <LoginForm onClickRegister={onRegisterClick} />
            ) : (
              <RegistrationForm onClickComeBack={onComeBackClick} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomePageView;
