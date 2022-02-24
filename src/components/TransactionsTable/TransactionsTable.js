import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EllipsisText from 'react-ellipsis-text';

import transactionsOperations from '../../redux/transactions/transactionsOperations';
import * as selectors from '../../redux/transactions/transactionsSelectors';

import styles from './TransactionsTable.module.css';

import Modal from '../../components/Modal';
import transactionCategory from './transactionCategory';

import summaryOperations from '../../redux/summary/summaryOperations';

const TransactionsTable = transactionType => {
  const type = transactionType;
  const dispatch = useDispatch();
  const summaryType = type.transactionType;
  const transactions = useSelector(selectors.getTransactions);
  const isLoading = useSelector(selectors.getIsLoading);
  const filteredTransactions = transactions.filter(
    transaction => transaction.type === type.transactionType,
  );
  const [modalDel, setModalDel] = useState(false);
  const [transaction, setTransaction] = useState('');

  const [thisYear, setThisYear] = useState(2022);

  useEffect(() => {
    dispatch(transactionsOperations.getTransactions());
    dispatch(summaryOperations.getSummary(summaryType, thisYear));
  }, [dispatch, summaryType]);

  useEffect(() => {
    if (isLoading) {
      dispatch(transactionsOperations.getTransactions());
      dispatch(summaryOperations.getSummary(summaryType, thisYear));
      return;
    }
  }, [isLoading, dispatch, summaryType]);

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
    dispatch(transactionsOperations.getTransactions());
    dispatch(summaryOperations.getSummary(summaryType, thisYear));
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
              <th className={`${styles.th} ${styles.thData}`}>
                <span>Дата</span>
              </th>
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
              {filteredTransactions
                .map(transaction => (
                  <tr key={transaction._id} className={styles.td}>
                    <td className={styles.thData}>
                      {`${transaction.day}.${transaction.month}.${transaction.year}`}
                    </td>
                    <td className={styles.tdDesc}>
                      <EllipsisText
                        text={transaction.description}
                        length={15}
                      />
                    </td>
                    <td className={styles.thCateg}>
                      {transactionCategory[transaction.category]}
                    </td>
                    <td
                      className={`${
                        transaction.type !== 'income'
                          ? styles.tdSumExpense
                          : styles.tdSum
                      }`}
                    >
                      <EllipsisText
                        text={
                          transaction.type === 'income'
                            ? `${transaction.amount.toLocaleString(
                                'ru',
                              )}.00 грн.`
                            : `-${transaction.amount.toLocaleString(
                                'ru',
                              )}.00 грн.`
                        }
                        length={14}
                      />
                    </td>
                    <td
                      className={styles.thIcon}
                      onClick={() => handleDeleteClick(transaction)}
                    >
                      <button className={styles.deleteBtn}></button>
                    </td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export { TransactionsTable };
