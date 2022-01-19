import { useState, useRef } from 'react';

// import { useSelector, useDispatch} from 'react-redux'
// import { incomeOutcomeOperations, incomeOutcomeSelectors } from 'Redux/incomeOutcome'

import styles from './IncomeOutcomeForm.module.css';

const IncomeOutcomeForm = () => {
  // const transactions = useSelector(incomeOutcomeSelectors.getTransaction)
  // const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [summ, setSumm] = useState('');

  const onChange = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'summ':
        setSumm(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = evt => {
    evt.preventDefault();

    // dispatch(incomeOutcomeOperations.addTransaction({name, category, summ}))

    setName('');
    setCategory('');
    setSumm('');
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setSumm('');
  };

  const textInput = useRef(null);

  const onSummFieldClick = () => {
    textInput.current.focus();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <ul>
        <li>
          <label className={styles.field}>
            <input
              className={styles.nameInput}
              type="text"
              name="name"
              placeholder="Описание товара"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Описание должно состоять из букв, апострофа, тире и пробелов. Например Манная каша, Проезд на метро и т. д."
              value={name}
              onChange={onChange}
              required
            />
          </label>
        </li>
        <li>
          <label className={styles.field}>
            <input
              className={styles.categoryInput}
              type="text"
              name="category"
              placeholder="Категория товара"
              title="Выберите категорию"
              value={category}
              onChange={onChange}
              required
            />
          </label>
        </li>
        <li className={styles.summField}>
          <div className={styles.summWrapper} onClick={onSummFieldClick}>
            <label className={styles.field}>
              <input
                className={styles.summInput}
                inputMode="numeric"
                type="number"
                name="summ"
                title="Введите сумму"
                value={summ}
                onChange={onChange}
                ref={textInput}
                placeholder="00.00"
                required
              />
            </label>
            <p className={styles.uah}>
              <span>UAH</span>
            </p>
            <button
              onClick={onChange}
              className={styles.summButton}
              type="button"
            ></button>
          </div>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button className={styles.enterButton} type="submit">
          ВВОД
        </button>

        <button
          className={styles.clearButton}
          type="button"
          onClick={resetForm}
        >
          ОЧИСТИТЬ
        </button>
      </div>
    </form>
  );
};

export default IncomeOutcomeForm;
