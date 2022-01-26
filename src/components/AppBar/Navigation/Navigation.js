import React, { Fragment } from 'react';
import Media from 'react-media';
import s from './Navigation.module.css';
import Icons from '../../Icon';

export default function Navigation() {
  return (
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
              <a href="/" className={s.header__logout_svg}>
                <Icons iconName="logout" />
              </a>
            )}
            {matches.medium && (
              <a href="/">
                <span className={s.header__logout_text}>Выйти</span>
              </a>
            )}
          </Fragment>
        )}
      </Media>
    </div>
  );
}
