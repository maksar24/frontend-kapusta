const getTransactions = state => state.transactions.transactionsReducer;

const getIsLoading = state => state.transactions.isLoading;

export { getTransactions, getIsLoading };
