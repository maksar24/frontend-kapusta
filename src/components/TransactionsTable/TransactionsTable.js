import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EllipsisText from 'react-ellipsis-text';

import transactionsOperations from '../../redux/transactions/transactionsOperations';
import * as selectors from '../../redux/transactions/transactionsSelectors';

import styles from './TransactionsTable.module.css';

import Modal from '../../components/Modal';

const TransactionsTable = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(selectors.getTransactions);
  const [modalDel, setModalDel] = useState(false);
  const [transaction, setTransaction] = useState('');

  useEffect(() => {
    dispatch(transactionsOperations.getTransactions());
  }, [dispatch]);

  const handleDeleteClick = transaction => {
    setModalDel(true);
    setTransaction(transaction._id);
  };

  const onDelCancel = () => {
    setTransaction('');
    setModalDel(false);
  };

  const onDelOk = () => {
    setModalDel(false);
    const transactionToDel = transactions.find(
      item => item._id === transaction,
    );
    dispatch(transactionsOperations.deleteTransaction(transactionToDel));
    setTransaction('');
  };

  return (
    <>
      {modalDel && (
        <Modal
          modalTitle="Вы действительно хотите удалить эту запись?"
          handleClickRight={onDelCancel}
          handleClickLeft={onDelOk}
          onClose={onDelCancel}
        />
      )}

      <div className={styles.bodyTable}>
        <table className={styles.main}>
          <thead className={styles.theadTable}>
            <tr>
              <th className={`${styles.th} ${styles.thData}`}>Дата</th>
              <th className={`${styles.th} ${styles.thDesc}`}>Описание</th>
              <th className={`${styles.th} ${styles.thCateg}`}>Категория</th>
              <th className={`${styles.th} ${styles.thSum}`}>Сумма</th>
              <th className={`${styles.th} ${styles.thEmpty}`}></th>
            </tr>
          </thead>
        </table>
        <div className={styles.bodyTableScroll}>
          <table className={`${styles.main} ${styles.mainTbody}`}>
            <tbody className={styles.tbodyTable}>
              {transactions.map(transaction => (
                <tr key={transaction._id} className={styles.td}>
                  <td className={styles.thData}>
                    {`${transaction.day}.${transaction.month}.${transaction.year}`}
                  </td>
                  <td className={styles.tdDesc}>
                    <EllipsisText text={transaction.description} length={5} />
                  </td>
                  <td className={styles.thCateg}>{transaction.category}</td>
                  <td
                    className={
                      // `${styles.tdSum}`
                      `${
                        transaction.type !== 'income'
                          ? styles.tdSumExpense
                          : styles.tdSum
                      }`
                    }
                  >
                    <EllipsisText
                      text={
                        transaction.type === 'income'
                          ? `${transaction.amount.toLocaleString('ru')}.00 грн.`
                          : `-${transaction.amount.toLocaleString(
                              'ru',
                            )}.00 грн.`
                      }
                      length={10}
                    />
                  </td>
                  <td
                    className={styles.thIcon}
                    onClick={() => handleDeleteClick(transaction)}
                  >
                    <button className={styles.deleteBtn}></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export { TransactionsTable };
