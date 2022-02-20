import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.css';

const CustomLoader = () => {
  return (
    <div className={s.loader}>
      <TailSpin color="#ff751d" height={220} width={180} />
    </div>
  );
};

export default CustomLoader;
