import s from './Logo.module.css';
import Icons from '../Icon';

export default function Logo() {
  return (
    <div className={s.container}>
      <Icons iconName="logo" />
      <p className={s.text}>Smart Finance</p>
    </div>
  );
}
