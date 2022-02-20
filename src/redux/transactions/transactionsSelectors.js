const getTransactions = state => state.transactions.transactionsReducer;
// const getOwner = state => state.transactions.transactionsReducer[0].owner;
const getIsLoading = state => state.transactions.isLoading;

export { getTransactions, getIsLoading };
