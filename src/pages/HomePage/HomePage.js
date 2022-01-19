import React, { useState } from 'react';
import LoginForm from '../../components/LogInForm';
import Background from '../../components/Background';
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
      <LoginForm onClickRegister={onRegisterClick} />
    </Background>
  );
};

export default HomePageView;
