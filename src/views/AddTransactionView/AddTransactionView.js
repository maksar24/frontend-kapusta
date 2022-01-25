import IncomeOutcomeForm from '../../components/IncomeOutcomeForm';
import Container from '../../components/Container';
import { BackgroundMobile } from '../../components/Background';

import styles from './AddTransactionView.module.css';

const AddTransactionView = () => {
  return (
    <BackgroundMobile>
      <Container>
        <div className={styles.wrapper}>
          <IncomeOutcomeForm />
        </div>
      </Container>
    </BackgroundMobile>
  );
};

export default AddTransactionView;
