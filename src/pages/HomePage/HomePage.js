import React, { useState } from 'react';
import LoginForm from '../../components/LogInForm';
import { BackgroundAuth } from '../../components/Background';

const HomePage = () => {
  const [login, setLogin] = useState(true);

  const onRegisterClick = () => {
    setLogin(false);
  };

  const onComeBackClick = () => {
    setLogin(true);
  };

  return (
    <BackgroundAuth>
      <LoginForm onClickRegister={onRegisterClick} />
    </BackgroundAuth>
  );
};

export default HomePage;
