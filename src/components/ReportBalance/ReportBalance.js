import React from 'react';
import s from './reportBalance.module.css';
import { useSelector } from 'react-redux';

const ReportBalance = () => {
  const { income, consumption } = useSelector(data => data.balanceReducer);

  return (
    <div className={s.section_balance}>
      <div className={s.balance_item}>
        <p className={s.balance_item_title}>Расходы:</p>
        <span className={`${s.balance_item_text} ${s.balance_item_expense}`}>
          - {consumption?.length > 0 ? consumption[0].consumption : 0}.00 грн.
        </span>
      </div>
      {/* <Strip className={s.amountStrip} /> */}
      <div className={s.balance_item}>
        <p className={s.balance_item_title}>Доходы:</p>
        <span className={`${s.balance_item_text} ${s.balance_item_income}`}>
          + {income?.length > 0 ? income[0].income : 0}.00 грн.
        </span>
      </div>
    </div>
  );
};
export default ReportBalance;
