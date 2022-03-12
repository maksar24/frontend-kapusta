import { createReducer, combineReducers } from '@reduxjs/toolkit';

import summaryActions from './summaryActions';

const summaryReducer = createReducer([], {
  [summaryActions.getSummarySuccess]: (_, { payload }) => payload.summary,
});

/* const isLoading = createReducer(false, {
  [summaryActions.getSummary]: () => true,
  [summaryActions.getSummarySuccess]: () => false,
  [summaryActions.getSummaryError]: () => false,
});

const fetchSum = combineReducers({
  summaryReducer,
  isLoading,
}); */

export default summaryReducer;
