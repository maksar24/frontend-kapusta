import { useState, useRef, Fragment } from 'react';
import Media from 'react-media';
import optionsIncome from '../../data/incomeCategories.json';
import optionsOutcome from '../../data/outcomeCategories.json';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useDispatch } from 'react-redux';
import transactionsOperations from '../../redux/transactions/transactionsOperations';

import styles from './IncomeOutcomeForm.module.css';
import transactionCategory from './transactionCategory';

const IncomeOutcomeForm = ({ transactionType, showMobileAddView }) => {
  const [day] = useState(new Date().getDate());
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  const type = transactionType;
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const onChange = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'summ':
        setAmount(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = evt => {
    evt.preventDefault();

    const transaction = {
      type: type,
      description,
      category: transactionCategory[category.value],
      amount: Number(amount),
      day: day.toString(),
      month: month.toString(),
      year: year.toString(),
    };

    dispatch(transactionsOperations.addTransaction(transaction));
    // dispatch(transactionsOperations.getTransactions());
    setDescription('');
    setCategory('');
    setAmount('');
  };

  const onSubmitMobile = evt => {
    evt.preventDefault();

    const transaction = {
      type: type,
      description,
      category: transactionCategory[category.value],
      amount: Number(amount),
      day: day.toString(),
      month: month.toString(),
      year: year.toString(),
    };
    console.log(transaction);

    dispatch(transactionsOperations.addTransaction(transaction));
    // dispatch(transactionsOperations.getTransactions());
    setDescription('');
    setCategory('');
    setAmount('');
    showMobileAddView();
  };

  const resetForm = () => {
    setDescription('');
    setCategory('');
    setAmount('');
  };

  const textInput = useRef(null);

  const onSummFieldClick = () => {
    textInput.current.focus();
  };

  const options = type === 'consumption' ? optionsIncome : optionsOutcome;

  const setSelect = selectedOption => {
    setCategory(selectedOption);
  };

  const goBack = () => {
    showMobileAddView();
  };

  return (
    <Media
      queries={{
        small: '(max-width: 767px)',
        medium: '(min-width: 768px)',
      }}
    >
      {matches => (
        <Fragment>
          {matches.small && (
            <Fragment>
              <button
                className={`${styles.backButton}`}
                type="button"
                onClick={goBack}
              ></button>
              <form className={styles.form} onSubmit={onSubmitMobile}>
                <ul className={styles.ul}>
                  <li className={styles.nameLi}>
                    <label className={styles.nameField}>
                      <input
                        className={styles.nameInput}
                        type="text"
                        name="name"
                        placeholder="Описание товара"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Описание должно состоять из букв, апострофа, тире и пробелов. Например Манная каша, Проезд на метро и т. д."
                        value={description}
                        onChange={onChange}
                        required
                      />
                    </label>
                  </li>
                  <li className={styles.dropdownLi}>
                    <Dropdown
                      className={styles.categoriesRoot}
                      controlClassName={styles.categoriesControll}
                      arrowClassName={styles.categoriesArrow}
                      placeholderClassName={styles.categoriesPlaceholder}
                      menuClassName={styles.categoriesMenu}
                      optionsClassName={styles.categoriesOption}
                      placeholder="Категория товара"
                      type="text"
                      name="category"
                      options={options}
                      onChange={setSelect}
                      value={category}
                      defaultValue=""
                    />
                  </li>
                  <li className={styles.summField}>
                    <div className={styles.summWrapper}>
                      <label className={styles.numberField}>
                        <input
                          className={styles.summInput}
                          inputMode="numeric"
                          type="number"
                          name="summ"
                          title="Введите сумму"
                          value={amount}
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
                        onClick={(onChange, onSummFieldClick)}
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
            </Fragment>
          )}
          {matches.medium && (
            <form className={styles.form} onSubmit={onSubmit}>
              <ul className={styles.ul}>
                <li className={styles.nameLi}>
                  <label className={styles.nameField}>
                    <input
                      className={styles.nameInput}
                      type="text"
                      name="name"
                      placeholder="Описание товара"
                      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                      title="Описание должно состоять из букв, апострофа, тире и пробелов. Например Манная каша, Проезд на метро и т. д."
                      value={description}
                      onChange={onChange}
                      required
                    />
                  </label>
                </li>
                <li className={styles.dropdownLi}>
                  <Dropdown
                    className={styles.categoriesRoot}
                    controlClassName={styles.categoriesControll}
                    arrowClassName={styles.categoriesArrow}
                    placeholderClassName={styles.categoriesPlaceholder}
                    menuClassName={styles.categoriesMenu}
                    optionsClassName={styles.categoriesOption}
                    placeholder="Категория товара"
                    type="text"
                    name="category"
                    options={options}
                    onChange={setSelect}
                    value={category}
                    defaultValue=""
                  />
                </li>
                <li className={styles.summField}>
                  <div className={styles.summWrapper}>
                    <label className={styles.numberField}>
                      <input
                        className={styles.summInput}
                        inputMode="numeric"
                        type="number"
                        name="summ"
                        title="Введите сумму"
                        value={amount}
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
                      onClick={(onChange, onSummFieldClick)}
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
          )}
        </Fragment>
      )}
    </Media>
  );
};

export default IncomeOutcomeForm;
