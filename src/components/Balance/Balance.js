import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import s from './Balance.module.css';
import Notification from '../Notification';
import { authOperations, authSelectors } from '../../redux/auth';
import * as selectors from '../../redux/transactions/transactionsSelectors';

export default function Balance({ style, hide }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const balance = useSelector(authSelectors.getUserBalance);
  const [userBalance, setUserBalance] = useState(balance);
  const isLoading = useSelector(selectors.getIsLoading);
  const [showingModal, setShowingModal] = useState(true);

  const toggleModal = () => {
    setShowingModal(setShowingModal => !setShowingModal);
  };

  useEffect(() => {
    dispatch(authOperations.getUserBalance());
    setUserBalance(balance);
  }, [isLoading, dispatch]);

  const handleChange = e => {
    const { value } = e.target;
    setUserBalance(Number(value));
  };

  const handleBalance = e => {
    e.preventDefault();
    if (!userBalance || userBalance === 0) {
      return console.log('Сумма должна баланса должна быть больше нуля');
    }
    dispatch(authOperations.setUserBalance(userBalance));
  };

  return (
    <form className={`${s.balance_form} ${style}`}>
      <label className={s.balance_text}>Баланс:</label>
      <div className={s.balance_container}>
        <input
          onChange={handleChange}
          placeholder={balance ? `${balance}.00 UAH` : `00.00 UAH`}
          className={`${
            balance === 0 ? s.balance_input_active : s.balance_input
          } ${location.pathname === '/report' && s.balance_input_report}`}
          disabled={balance !== 0 && 'disabled'}
        />
        {balance === 0 && showingModal && (
          <Notification onClose={toggleModal} />
        )}
        <button
          type="submit"
          onClick={handleBalance}
          className={`${
            balance === 0 ? s.balance_button_active : s.balance_button
          } ${hide}`}
          disabled={balance !== 0 && 'disabled'}
        >
          ПОДТВЕРДИТЬ
        </button>
      </div>
    </form>
  );
}
