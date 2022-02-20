import { createAction } from '@reduxjs/toolkit';

const getTransactionsRequest = createAction('getTransactionsRequest');
const getTransactionsSuccess = createAction('getTransactionsSuccess');
const getTransactionsError = createAction('getTransactionsError');

const addTransactionRequest = createAction('addTransactionRequest');
const addTransactionSuccess = createAction('addTransactionSucces');
const addTransactionError = createAction('addTransactionError');

const deleteTransactionRequest = createAction('deleteTransactionRequest');
const deleteTransactionSuccess = createAction('deleteTransactionSucces');
const deleteTransactionError = createAction('deleteTransactionError');

const transactionsActions = {
  getTransactionsRequest,
  getTransactionsSuccess,
  getTransactionsError,
  addTransactionRequest,
  addTransactionSuccess,
  addTransactionError,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  deleteTransactionError,
};

export default transactionsActions;
