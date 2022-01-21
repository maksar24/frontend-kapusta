import { useState } from 'react';

import s from './RegistrationForm.module.css';

const RegisterForm = ({ onClickComeBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setNameError] = useState('это обязательное поле');
  const [setEmaiError] = useState('это обязательное поле');
  const [setPasswordError] = useState('это обязательное поле');
  const [setErrorSymbol] = useState('*');

  const nameHandler = e => {
    setName(e.target.value);
    const re = /^[A-Za-zА-Яа-яЁё' '\-()0-9]{3,30}$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError('Некорректное имя');
      setErrorSymbol('*');
      if (!e.target.value) {
        setNameError('Это обязательное поле!!!');
        setErrorSymbol('*');
      }
    } else {
      setNameError('');
    }
  };

  const emailHandler = e => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmaiError('Некорректный email');
      setErrorSymbol('*');
      if (!e.target.value) {
        setEmaiError('Это обязательное поле!!!');
        setErrorSymbol('*');
      }
    } else {
      setEmaiError('');
    }
  };

  const passwordHandler = e => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError('Пароль должен быть не меньше 6 символов');
      if (!e.target.value) {
        setPasswordError('Это обязательное поле!!!');
      }
    } else {
      setPasswordError('');
    }
  };

  const clearInput = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    clearInput();
  };

  return (
    <div className={s.formRegistr}>
      <p className={s.promtText}>Для регистрации заполните форму:</p>
      <form onSubmit={handleSubmit} action="" autoComplete="on">
        <div>
          <label className={s.formLabel} htmlFor="">
            <p className={s.labelText}>Имя:</p>
            <input
              onChange={nameHandler}
              type="text"
              name="name"
              value={name}
              placeholder="Ваше имя"
              className={s.formInput}
              pattern="^[A-Za-zА-Яа-яЁёЄєЇї' '\-()0-9]{3,30}$"
              title="Имя может состоять только от трёх до 30 букв, апострофа, тире и пробелов. Например Adrian, Jac Mercer, d'Artagnan, Александр Репета и т.п."
              required
            />
          </label>
        </div>
        <div>
          <label className={s.formLabel} htmlFor="">
            <p className={s.labelText}>Электронная почта:</p>
            <input
              onChange={emailHandler}
              type="text"
              name="email"
              value={email}
              placeholder="Your@email.com"
              className={s.formInput}
              pattern="[A-Za-zА-Яа-яЁёЄєЇї0-9._%+-]+@[A-Za-zА-Яа-яЁёЄєЇї0-9.-]+\.[A-Za-zА-Яа-яЁёЄєЇї]{2,4}$"
              title="Email может, сoстоять из букв цифр и обязательного символа '@'"
              required
            />
          </label>
        </div>
        <div>
          <label className={s.formLabel} htmlFor="">
            <p className={s.labelText}>Пароль:</p>
            <input
              onChange={passwordHandler}
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className={s.formInput}
              pattern="[0-9A-Za-zА-Яа-яЁёЄєЇї!@#$%^&*]{6,}"
              title="Пароль может, сoстоять не меньше чем из шести букв цифр и символов '!@#$%^&*'"
              required
            />
          </label>
        </div>
        <div className={s.containerButton}>
          <button type="button" onClick={onClickComeBack} className={s.button}>
            ВЕРНУТЬСЯ
          </button>
          <button type="submit" className={s.button}>
            ГОТОВО
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
