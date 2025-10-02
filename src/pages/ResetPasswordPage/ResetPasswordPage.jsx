import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, FieldWithLabel, GrowlFns, Input, RightToBracketIcon } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './ResetPasswordPage.module.scss';

const ResetPasswordPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const resetPasswordError = useSelector(UserSlice.selectors.selectResetPasswordError);
  const resetPasswordSuccess = useSelector(UserSlice.selectors.selectResetPasswordSuccess);

  const [ email, setEmail ] = useState('');

  const onSubmitPasswordReset = useCallback((event) => {
    event.preventDefault();

    dispatch(UserSlice.actions.resetPasswordUser(email));
  }, [ dispatch, email ]);

  const onCloseResetPasswordErrorGrowl = useCallback(() => {
    dispatch(UserSlice.actions.clearResetPasswordError());
  }, [ dispatch ]);

  const onCloseResetPasswordSuccessGrowl = useCallback(() => {
    dispatch(UserSlice.actions.clearResetPasswordSuccess());
  }, [ dispatch ]);

  return (
    <div className={styles.ResetPasswordPageContainer}>
      <div>
        <h2>{t('Password Reset')}</h2>
        <p>{t('Inform your email to redefine your password')}</p>
      </div>

      <form onSubmit={onSubmitPasswordReset} className={styles.form}>
        <FieldWithLabel
          label={t('Email')}
          field={(
            <Input
              type="email"
              name="email"
              value={email}
              required={true}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
        />

        <Button
          className={styles.btnResetPassword}
          category={ButtonConstants.ButtonCategories.SUCCESS}
          icon={<RightToBracketIcon />}
        >
          {t('Send reset email')}
        </Button>
      </form>

      {GrowlFns.renderSuccessGrowl({
        message: resetPasswordSuccess,
        onCloseGrowl: onCloseResetPasswordSuccessGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: resetPasswordError,
        onCloseGrowl: onCloseResetPasswordErrorGrowl,
      })}
    </div>
  );
};

const ResetPasswordPageMemo = memo(ResetPasswordPage);

export { ResetPasswordPageMemo as ResetPasswordPage };
