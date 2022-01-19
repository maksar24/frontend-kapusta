const selectors = {
  getIsLoggedIn: state => state.auth.isLoggedIn,
  getUserName: state => state.auth.user.name,
  getCurrentUser: state => state.auth.current.user.name,
  getUserEmail: state => state.auth.user.email,
  getUserBalance: state => state.auth.user.balance,
  getToken: state => state.auth.token,
  getIsFetchingCurrent: state => state.auth.isFetchingCurrentUser,
  getError: state => state.auth.error,
};

export default selectors;
