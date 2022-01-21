import React, { useState } from 'react';
import LoginForm from '../../components/LogInForm';
import Background from '../../components/Background';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
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
    <Background>
      <div className={s.loginWrapper}>
        {login ? (
          <LoginForm onClickRegister={onRegisterClick} />
        ) : (
          <RegistrationForm onClickComeBack={onComeBackClick} />
        )}
      </div>
    </Background>
  );
};

export default HomePageView;
