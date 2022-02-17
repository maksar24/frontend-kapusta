import { useDispatch, useSelector } from 'react-redux';
import s from './Balance.module.css';
import { authOperations, authSelectors } from '../../redux/auth';
import { useLocation } from 'react-router-dom';

export default function Balance({ style, hide }) {
  // const userBalance = useSelector();
  // const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = e => {
    e.preventDefault();
    let balance = e.target.elements.balance.value;

    if (!balance || Number(balance) === 0) {
      return console.log('Сумма должна баланса должна быть больше нуля');
    }

    console.log(balance);

    e.target.elements.balance.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className={`${s.balance_form} ${style}`}>
      <label className={s.balance_text}>Баланс:</label>
      <div className={s.balance_container}>
        <input
          type="number"
          name="balance"
          maxLength="10"
          // placeholder={userBalance ? `${userBalance}UAH` : `00.00 UAH`}
          placeholder="00.00 UAH"
          className={`${s.balance_input} ${
            location.pathname === '/report' && s.balance_input_report
          }`}
          autoComplete="off"
        />
        <button type="submit" className={`${s.balance_button} ${hide}`}>
          ПОДТВЕРДИТЬ
        </button>
      </div>
    </form>
  );
}
