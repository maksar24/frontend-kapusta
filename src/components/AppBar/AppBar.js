import React, { Fragment } from 'react';
import Media from 'react-media';
import s from './AppBar.module.css';

export default function AppBar() {
  return (
    <header className={s.header}>
      <div className={s.header__wrapper}>
        <a href="/">
          <span className={s.header_logo}></span>
        </a>

        <div className={s.header__control_wrapper}>
          <div className={s.header__user_wrapper}>
            <span className={s.header_avatar}></span>
            <Media
              queries={{
                small: '(max-width: 767px)',
                medium: '(min-width: 768px)',
              }}
            >
              {matches => (
                <Fragment>
                  {matches.medium && (
                    <p className={s.header__login_name}>User Name</p>
                  )}
                </Fragment>
              )}
            </Media>
          </div>

          <Media
            queries={{
              small: '(max-width: 767px)',
              medium: '(min-width: 768px)',
            }}
          >
            {matches => (
              <Fragment>
                {matches.small && (
                  <button className={s.header__button_logout}>
                    <svg
                      className={s.header__button_logout_logo}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.99998 14H1.99998V1.99998H9.99998V2.99998H12V0H0V16H12V13H10V14H9.99998Z" />
                      <path d="M12.293 4.29297L10.8789 5.70702L12.1719 6.99998H7V8.99999H12.1719L10.8789 10.293L12.293 11.707L16 7.99997L12.293 4.29297Z" />
                    </svg>
                  </button>
                )}
                {matches.medium && (
                  <a href="/">
                    <span className={s.header__button_logout_text}>Выйти</span>
                  </a>
                )}
              </Fragment>
            )}
          </Media>
        </div>
      </div>
    </header>
  );
}
