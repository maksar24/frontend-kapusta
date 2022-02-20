import { createReducer, combineReducers } from '@reduxjs/toolkit';

import transactionsActions from './transactionsActions';

const transactionsReducer = createReducer([], {
  [transactionsActions.getTransactionsSuccess]: (_, { payload }) =>
    payload.data.result,
  [transactionsActions.addTransactionSuccess]: (state, { payload }) => [
    ...state,
    payload,
  ],
  [transactionsActions.deleteTransactionSuccess]: (state, { payload }) =>
    state.filter(item => item._id !== payload),
});

const isLoading = createReducer(false, {
  [transactionsActions.getTransactionsRequest]: () => true,
  [transactionsActions.getTransactionsSuccess]: () => false,
  [transactionsActions.getTransactionsError]: () => false,
  [transactionsActions.addTransactionRequest]: () => true,
  [transactionsActions.addTransactionSuccess]: () => false,
  [transactionsActions.addTransactionError]: () => false,
  [transactionsActions.deleteTransactionRequest]: () => true,
  [transactionsActions.deleteTransactionSuccess]: () => false,
  [transactionsActions.deleteTransactionError]: () => false,
});

const transactions = combineReducers({
  transactionsReducer,
  isLoading,
});

export default transactions;
