import IncomeOutcomeForm from '../../components/IncomeOutcomeForm';
import Container from '../../components/Container';

import styles from './AddTransactionPage.module.css';

const AddTransactionView = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <IncomeOutcomeForm />
      </div>
    </Container>
  );
};

export default AddTransactionView;
