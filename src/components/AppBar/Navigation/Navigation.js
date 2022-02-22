import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import s from './Navigation.module.css';
import Icons from '../../Icon';
import Modal from '../../Modal';
import { authOperations, authSelectors } from '../../../redux/auth';

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(authSelectors.getUserName);
  const avatar = useSelector(authSelectors.getAvatar);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };
  console.log(avatar);
  const logoutModal = () => {
    dispatch(authOperations.logOut());
    toggleModal();
    navigate('/auth');
  };

  return (
    <>
      <div className={s.header__control_wrapper}>
        <div className={s.header__user_wrapper}>
          <img src={avatar} className={s.header_avatar} alt="User avatar" />
          <Media
            queries={{
              small: '(max-width: 767px)',
              medium: '(min-width: 768px)',
            }}
          >
            {matches => (
              <Fragment>
                {matches.medium && (
                  <p className={s.header__login_name}>{userName}</p>
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
                <button
                  type="button"
                  onClick={toggleModal}
                  className={s.header__logout_svg}
                >
                  <Icons iconName="logout" />
                </button>
              )}
              {matches.medium && (
                <button
                  type="button"
                  onClick={toggleModal}
                  className={s.header_logout_button}
                >
                  <span className={s.header__logout_text}>Выйти</span>
                </button>
              )}
            </Fragment>
          )}
        </Media>
      </div>
      {showModal && (
        <Modal
          modalTitle={'Вы действительно хотите выйти?'}
          handleClickLeft={logoutModal}
          handleClickRight={toggleModal}
          onClose={toggleModal}
        />
      )}
    </>
  );
}