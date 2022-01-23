import logo from '../../../images/kapusta_logo.svg';
import Container from '../../Container';
import s from './BackgroundAuth.module.css';

//Максим, вместо logoSection добавь компонент логотипа

const BackgroundAuth = ({ children }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.decorSection}>
        <div className={s.decorImageTop}></div>

        <Container>
          <div className={s.inner}>
            <div className={s.logoSection}>
              <img className={s.decorLogo} src={logo} alt="Kapusta" />
              <h1 className={s.decorText}>SMART FINANSE</h1>
            </div>

            <div className={s.loginSection}>{children}</div>
          </div>
          <div className={`${s.bounce} ${s.decorImageBottom}`}></div>
        </Container>
      </div>
    </div>
  );
};

export { BackgroundAuth };
