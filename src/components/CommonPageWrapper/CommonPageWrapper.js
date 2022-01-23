import styles from './CommonPageWrapper.module.css';

const CommonPageWrapper = ({ children }) => {
  return (
    <ul className={styles.section}>
      <li className={styles.reportLink}>{children[0]}</li>
      <li className={styles.balance}>{children[1]}</li>
      <li className={styles.incomeOutcomeButtons}>{children[2]}</li>
    </ul>
  );
};

export default CommonPageWrapper;
