import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EllipsisText from 'react-ellipsis-text';

import transactionsOperations from '../../../redux/transactions/transactionsOperations';
import * as selectors from '../../../redux/transactions/transactionsSelectors';
import s from './MobileTable.module.css';
import Modal from '../../../components/Modal';

const MobileTable = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectors.getTransactions);
  const isLoading = useSelector(selectors.getIsLoading);
  const [modalDel, setModalDel] = useState(false);
  const [transaction, setTransaction] = useState('');

  useEffect(() => {
    dispatch(transactionsOperations.getTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(transactionsOperations.getTransactions());
      return;
    }
  }, [isLoading, dispatch]);

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
      <div className={s.tsList__container}>
        <ul className={s.mobileTable}>
          {transactions
            .map(transaction => (
              <li key={transaction._id} className={s.listItem}>
                <div className={s.listItem__wrapper}>
                  <p className={s.listItem__subCategory}>
                    {/* <EllipsisText text={transaction.description} length={15} /> */}
                    {transaction.description}
                  </p>
                  <div className={s.dateCategory__wrapper}>
                    <p className={s.listItem__date}>
                      {`${transaction.day}.${transaction.month}.${transaction.year}
                    `}
                    </p>
                    <p className={s.listItem__category}>
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className={s.listItem__sumWrapper}>
                  <p
                    className={`${
                      transaction.type !== 'income' ? s.tdSumExpense : s.tdSum
                    }`}
                  >
                    <EllipsisText
                      text={
                        transaction.type === 'income'
                          ? `${transaction.amount}.00 грн.`
                          : `-${transaction.amount}.00 грн.`
                      }
                      length={10}
                    />
                  </p>
                </div>

                <button
                  className={s.buttonDelMobile}
                  onClick={() => handleDeleteClick(transaction)}
                ></button>
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    </>
  );
};

export { MobileTable };
