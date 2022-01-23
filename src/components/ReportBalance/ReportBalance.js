import React from 'react';
import s from './reportBalance.module.css';

const ReportBalance = () => {
  //   const transactions = useSelector(getTransactionsPerMonth);

  //   const findTotalSum = type => {
  //     let totalSum = 0;
  //     const filteredType = transactions.filter(
  //       transaction => transaction.type === type,
  //     );
  //     filteredType.map(el => (totalSum += el.sum));
  //     return totalSum;
  //   };
  // {`+ ${findTotalSum('income').toLocaleString('ru')}.00 грн.`}
  // {
  //   `- ${findTotalSum('expense').toLocaleString('ru')}.00 грн.`;
  // }
  return (
    <div className={s.section_balance}>
      <div className={s.balance_item}>
        <p className={s.balance_item_title}>Расходы:</p>
        <span className={`${s.balance_item_text} ${s.balance_item_expense}`}>
          - 1000.00 грн.
        </span>
      </div>
      {/* <Strip className={s.amountStrip} /> */}
      <div className={s.balance_item}>
        <p className={s.balance_item_title}>Доходы:</p>
        <span className={`${s.balance_item_text} ${s.balance_item_income}`}>
          + 1000.00 грн.
        </span>
      </div>
    </div>
  );
};
export default ReportBalance;
