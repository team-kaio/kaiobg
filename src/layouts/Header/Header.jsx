import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants, BarsIcon, KaioLogo, XIcon } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './Header.module.scss';

const Header = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const toggleMenuRef = useRef(null);

  const onLogout = useCallback((event) => {
    event.preventDefault();
    dispatch(UserSlice.actions.signOutUser());
  }, [ dispatch ]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(currentIsMenuOpen => {
      document.body.style.overflow = !currentIsMenuOpen ? 'hidden' : '';
      return !currentIsMenuOpen;
    });
  }, []);

  const closeMenu = useCallback(() => {
    document.body.style.overflow = '';
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const onResizeWindow = () => {
      if(!toggleMenuRef.current) {
        return;
      }

      if(!toggleMenuRef.current.checkVisibility()) {
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', onResizeWindow);

    return () => {
      window.removeEventListener('resize', onResizeWindow);
    };
  }, []);

  return (
    <header className={styles.Header}>
      <div className={styles.logo} title='Kaio Guerrero Personal Trainer'>
        <Link to={{ pathname: '/' }} onClick={closeMenu}>
          <KaioLogo width='1.5rem' color='white' />
          <span>Kaio Guerrero</span>
        </Link>
      </div>
      
      <button
        ref={toggleMenuRef}
        className={styles.menuToggle}
        onClick={toggleMenu}
      >
        {isMenuOpen ?
          <XIcon color='white' /> :
          <BarsIcon color='white' />
        }
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        {
          !isLoggedIn ? (
            <Link to={{ pathname: '/sign-in' }} onClick={closeMenu}>{t('Sign in')}</Link>
          ) : <></>
        }

        {
          isLoggedIn ? (
            <Link to={{ pathname: '/athlete' }} onClick={closeMenu}>{t('Athlete')}</Link>
          ) : <></>
        }

        {
          isLoggedIn ? (
            <Link to={{ pathname: '/workout' }} onClick={closeMenu}>{t('Workout')}</Link>
          ) : <></>
        }

        <Link to={{ pathname: '/publications' }} onClick={closeMenu}>{t('Publications')}</Link>

        <Link to={{ pathname: '/courses' }} onClick={closeMenu}>{t('Courses')}</Link>

        {
          isLoggedIn && loggedUser?.isAdmin ? (
            <Link to={{ pathname: '/manage' }} onClick={closeMenu}>{t('Manage')}</Link>
          ) : <></>
        }

        {
          isLoggedIn ? (
            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              onClick={onLogout}
            >
              {t('Sign Out')}
            </Button>
          ) : <></>
        }
      </nav>
    </header>
  );
};

const HeaderMemo = memo(Header);

export { HeaderMemo as Header };
