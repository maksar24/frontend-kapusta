import axios from 'axios';

import transactionsActions from './transactionsActions';

axios.defaults.baseURL = 'https://kapusta-backend-node-js.herokuapp.com/api/';

const getTransactions = () => async dispatch => {
  dispatch(transactionsActions.getTransactionsRequest());
  try {
    const { data } = await axios.get(`/transaction`);
    dispatch(transactionsActions.getTransactionsSuccess(data));
  } catch (error) {
    dispatch(transactionsActions.getTransactionsError(error.message));
  }
};

const addTransaction = transaction => async dispatch => {
  dispatch(transactionsActions.addTransactionRequest());
  try {
    const { data } = await axios.post('/transaction', transaction);
    dispatch(transactionsActions.addTransactionSuccess(data));
  } catch (error) {
    dispatch(transactionsActions.addTransactionError(error.message));
  }
};

const deleteTransaction = transaction => async dispatch => {
  dispatch(transactionsActions.deleteTransactionRequest());
  try {
    axios.delete(`/transaction/${transaction._id}`);
    dispatch(transactionsActions.deleteTransactionSuccess(transaction._id));
  } catch (error) {
    dispatch(transactionsActions.deleteTransactionError(error.message));
  }
};

const transactionsOperations = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};

export default transactionsOperations;
