import React, { useState } from 'react';
import LoginForm from '../../components/LogInForm';
import Background from '../../components/Background';
import s from './HomePage.module.css';

const HomePageView = () => {
  const [setLogin] = useState(true);

  const onRegisterClick = () => {
    setLogin(false);
  };

  return (
    <Background>
      <LoginForm onClickRegister={onRegisterClick} />
    </Background>
  );
};

export default HomePageView;
