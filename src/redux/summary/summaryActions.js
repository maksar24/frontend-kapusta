import { createAction } from '@reduxjs/toolkit';

const getSummaryRequest = createAction('getSummaryRequest');
const getSummarySuccess = createAction('getSummarySuccess');
const getSummaryError = createAction('getSummaryError');

const summaryActions = {
  getSummaryRequest,
  getSummarySuccess,
  getSummaryError,
};

export default summaryActions;
