import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { ActionCard, AvatarPlaceholder, CalendarIcon, ClipboardCheckIcon, ClipboardListIcon, GrowlFns, Image, LocationPinIcon, UploadProfilePictureDialog, UserForm, UserFormConstants, UserIcon } from '@/components';
import { REQUEST_STATUS } from '@/constants';
import { UserSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './AthleteAreaPage.module.scss';

const AthleteAreaPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [ searchParams ] = useSearchParams();

  const athleteId = searchParams.get('uid') || null;

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);
  const selectedAthlete = useSelector(UserSlice.selectors.selectUserByUid(athleteId));
  const saveUserError = useSelector(UserSlice.selectors.selectSaveUserError);
  const saveUserStatus = useSelector(UserSlice.selectors.selectSaveUserStatus);
  const saveUserSuccessMessage = useSelector(UserSlice.selectors.selectSaveUserSuccessMessage);

  const uploadDialogFnsRef = useRef(null);

  const athleteData = useMemo(() => {
    if(!athleteId) {
      return {
        plan: '',
        frequency: '',
        ...(loggedUser || {}),
        age: utils.calculateAge(loggedUser?.birthdate),
      };
    }

    return {
      plan: '',
      frequency: '',
      ...(selectedAthlete || {}),
      age: utils.calculateAge(loggedUser?.birthdate),
    };
  }, [ athleteId, loggedUser, selectedAthlete ]);

  const onSubmitSaveUser = useCallback((data) => {
    dispatch(UserSlice.actions.saveUser({
      ...data,
      uid: athleteData.uid,
    }));
  }, [ athleteData.uid, dispatch ]);

  const onCloseSaveUserErrorGrowl = useCallback(() => {
    dispatch(UserSlice.actions.clearSaveUserError());
  }, [ dispatch ]);

  const onCloseSaveUserSuccessGrowl = useCallback(() => {
    dispatch(UserSlice.actions.clearSaveUserSuccessMessage());
  }, [ dispatch ]);

  useEffect(() => {
    if(saveUserStatus == REQUEST_STATUS.SUCCEEDED) {
      dispatch(UserSlice.actions.loadUser(loggedUser));
      dispatch(UserSlice.actions.clearSaveUserState());
    }
  }, [ dispatch, loggedUser, saveUserStatus ]);

  return (
    <div className={styles.AthleteAreaPage}>
      <h1>{t('Athlete')}</h1>

      <div className={styles.AthleteCard}>
        <div className={styles.content}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>
              <AvatarPlaceholder
                userName={athleteData?.fullName}
                avatar={athleteData?.avatar}
                uploadDialogFnsRef={uploadDialogFnsRef}
              />
            </div>

            <div className={styles.profileDetails}>
              <h2 className={styles.profileName}>{athleteData.fullName}</h2>

              <div className={styles.profileGrid}>
                <div>
                  <div className={styles.profileField}>
                    <UserIcon />
                    <span className={styles.profileFieldLabel}>{t('Age')}:</span>
                    <span>{athleteData.age} {t('years old')}</span>
                  </div>
                  <div className={styles.profileField}>
                    <CalendarIcon />
                    <span className={styles.profileFieldLabel}>{t('Plan')}:</span>
                    <span>{athleteData.plan}</span>
                  </div>
                  <div className={styles.profileField}>
                    <LocationPinIcon />
                    <span className={styles.profileFieldLabel}>{t('Frequency')}:</span>
                    <span>{athleteData.frequency}</span>
                  </div>
                </div>
              </div>

              <div className={styles.objective}>
                <p>
                  <strong>{t('Objective')}:</strong> {athleteData.goal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.ActionsGrid} ${styles.grid3Cols}`}>
        <ActionCard
          renderIcon={(props) => <ClipboardListIcon {...props} />}
          title={t('Training')}
          description={t('Access your workouts')}
          to={{
            pathname: '/workout',
            ...(athleteId ? { search: `?uid=${athleteId}` } : {}),
          }}
        />

        <ActionCard
          renderIcon={(props) => <ClipboardCheckIcon {...props} />}
          title="Check-ins"
          description={t('Check-in history')}
          to={{ pathname: '/check-ins' }}
        >
          <div className={styles.actionCardMeta}>
            <div className={styles.label}>{t('Last check-in')}:</div>
            <div className={styles.value}>
              {athleteData?.lastCheckInDate ? utils.getDateFormatted(new Date(athleteData.lastCheckInDate), { weekday: 'long' }) : t('No check-in found')}
            </div>
          </div>
        </ActionCard>

        {/* TODO: Confirm with Kaio how the Physical Assessment page will look. */}
        {/* <ActionCard
          renderIcon={(props) => <RankingStarIcon className='CSJ' {...props} />}
          title={t('Physical Assessment')}
          description={t('Assessment history')}
        >
          <div className={styles.actionCardMeta}>
            <div className={styles.label}>{t('Latest tests')}:</div>
          </div>
        </ActionCard> */}
      </div>

      <div className={styles.AthleteCard}>
        <div className={styles.content}>
          <div className={styles.profileInfo}>
            <div className={styles.profileDetails}>
              <UserForm
                mode={UserFormConstants.USER_FORM_MODES.EDIT}
                initialData={athleteData}
                onSubmit={onSubmitSaveUser}
              />
            </div>
          </div>
        </div>
      </div>

      <UploadProfilePictureDialog
        dialogFnsRef={uploadDialogFnsRef}
        onConfirm={onSubmitSaveUser}
      />

      {GrowlFns.renderSuccessGrowl({
        message: saveUserSuccessMessage,
        onCloseGrowl: onCloseSaveUserSuccessGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: saveUserError,
        onCloseGrowl: onCloseSaveUserErrorGrowl,
      })}
    </div>
  );
};

const AthleteAreaPageMemo = memo(AthleteAreaPage);

export { AthleteAreaPageMemo as AthleteAreaPage };
