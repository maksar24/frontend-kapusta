import IncomeOutcomeForm from '../../components/IncomeOutcomeForm';
import Container from '../../components/Container';
import { BackgroundMobile } from '../../components/Background';

import styles from './AddTransactionView.module.css';

const AddTransactionView = ({
  showMobileAddView,
  transactionType,
  setTransactionTypeIncome,
  setTransactionTypeConsumption,
}) => {
  return (
    <BackgroundMobile>
      <Container>
        <div className={styles.wrapper}>
          <IncomeOutcomeForm
            showMobileAddView={showMobileAddView}
            transactionType={transactionType}
            setTransactionTypeIncome={setTransactionTypeIncome}
            setTransactionTypeConsumption={setTransactionTypeConsumption}
          />
        </div>
      </Container>
    </BackgroundMobile>
  );
};

export default AddTransactionView;
