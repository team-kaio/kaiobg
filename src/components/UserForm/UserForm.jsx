import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button, ButtonConstants, FieldWithLabel, FloppyDiskIcon, Input, UserFormConstants, UserPlusIcon } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './UserForm.module.scss';

const UserForm = (props) => {
  const { mode, initialData = null } = props;
  const { onSubmit } = props;

  const { t } = useTranslation();

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ fullName, setFullName ] = useState(initialData?.fullName || '');
  const [ email, setEmail ] = useState(initialData?.email || '');
  const [ password, setPassword ] = useState(initialData?.password || '');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState(initialData?.phoneNumber || '');
  const [ birthdate, setBirthdate ] = useState(initialData?.birthdate || '');
  const [ occupation, setOccupation ] = useState(initialData?.occupation || '');
  const [ plan, setPlan ] = useState(initialData?.plan || '');
  const [ frequency, setFrequency ] = useState(initialData?.frequency || '');
  const [ goal, setGoal ] = useState(initialData?.goal || '');
  const [ limitations, setLimitations ] = useState(initialData?.limitations || '');
  const [ medicalRestrictions, setMedicalRestrictions ] = useState(initialData?.medicalRestrictions || '');
  const [ medicine, setMedicine ] = useState(initialData?.medicine || '');
  const [ confirmInformation, setConfirmInformation ] = useState(false);

  const SUBMIT_BUTTON_MAPPER = useMemo(() => {
    return {
      [UserFormConstants.USER_FORM_MODES.SIGN_UP]: {
        icon: <UserPlusIcon />,
        text: t('Sign up'),
      },
      [UserFormConstants.USER_FORM_MODES.EDIT]: {
        icon: <FloppyDiskIcon />,
        text: t('Save'),
      },
    };
  }, [ t ]);

  const onSubmitForm = useCallback((event) => {
    event.preventDefault();

    const data = mode == UserFormConstants.USER_FORM_MODES.SIGN_UP || loggedUser?.isAdmin ? {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      birthdate,
      occupation,
      plan,
      frequency,
      goal,
      limitations,
      medicalRestrictions,
      medicine,
      confirmInformation,
    } : {
      fullName,
      phoneNumber,
      birthdate,
      occupation,
    };

    onSubmit(data);
  }, [ birthdate, confirmInformation, confirmPassword, email, frequency, fullName, goal, limitations, loggedUser?.isAdmin, medicalRestrictions, medicine, mode, occupation, onSubmit, password, phoneNumber, plan ]);

  return (
    <form onSubmit={onSubmitForm} className={styles.UserForm}>
      <FieldWithLabel
        label={t('Fullname')}
        field={(
          <Input
            type="text"
            name="email"
            value={fullName}
            required={true}
            onChange={(event) => setFullName(event.target.value)}
          />
        )}
      />

      {
        mode == UserFormConstants.USER_FORM_MODES.SIGN_UP ? (
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
        ) : <></>
      }

      <FieldWithLabel
        label={t('Phone Number')}
        field={(
          <Input
            type="text"
            name="phone-number"
            maxLength="15"
            value={phoneNumber}
            required={true}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        )}
      />

      <FieldWithLabel
        label={t('Birthdate')}
        field={(
          <Input
            type="date"
            name="birthdate"
            value={birthdate}
            required={true}
            onChange={(event) => setBirthdate(event.target.value)}
          />
        )}
      />

      <FieldWithLabel
        label={t('Occupation')}
        field={(
          <Input
            type="text"
            name="occupation"
            value={occupation}
            required={true}
            onChange={(event) => setOccupation(event.target.value)}
          />
        )}
      />

      {
        mode == UserFormConstants.USER_FORM_MODES.EDIT && loggedUser?.isAdmin ? (
          <>
            <FieldWithLabel
              label={t('Plan')}
              field={(
                <Input
                  type="text"
                  name="plan"
                  value={plan}
                  required={true}
                  onChange={(event) => setPlan(event.target.value)}
                />
              )}
            />

            <FieldWithLabel
              label={t('Frequency')}
              field={(
                <Input
                  type="text"
                  name="frequency"
                  value={frequency}
                  required={true}
                  onChange={(event) => setFrequency(event.target.value)}
                />
              )}
            />
          </>
        ) : <></>
      }

      {
        mode == UserFormConstants.USER_FORM_MODES.SIGN_UP ? (
          <>
            <FieldWithLabel
              label={t('Password')}
              field={(
                <Input
                  type="password"
                  name="password"
                  value={password}
                  required={true}
                  onChange={(event) => setPassword(event.target.value)}
                />
              )}
            />

            <FieldWithLabel
              label={t('Confirm Password')}
              field={(
                <Input
                  type="password"
                  name="confirm-password"
                  value={confirmPassword}
                  required={true}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              )}
            />
          </>
        ): <></>
      }

      {
        mode == UserFormConstants.USER_FORM_MODES.SIGN_UP || loggedUser?.isAdmin ? (
          <div className={styles.Anamnese}>
            <h3>{t('Anamnese')}</h3>

            <p>{t('In order for you to access your workouts, I\'ll need some information. We\'ll conduct a medical history to ensure training safety. Feel free to share whatever you think is relevant.')}</p>

            <FieldWithLabel
              label={t('What is your goal with training?')}
              field={(
                <Input
                  type="text"
                  name="goal"
                  value={goal}
                  required={true}
                  onChange={(event) => setGoal(event.target.value)}
                />
              )}
            />

            <FieldWithLabel
              label={t('Do you have any limitations when it comes to exercise?')}
              field={(
                <Input
                  type="text"
                  name="limitations"
                  value={limitations}
                  required={true}
                  onChange={(event) => setLimitations(event.target.value)}
                />
              )}
            />

            <FieldWithLabel
              label={t('Do you have any medical restrictions?')}
              field={(
                <Input
                  type="text"
                  name="medical-restrictions"
                  value={medicalRestrictions}
                  required={true}
                  onChange={(event) => setMedicalRestrictions(event.target.value)}
                />
              )}
            />

            <FieldWithLabel
              label={t('Are you taking any medicine?')}
              field={(
                <Input
                  type="text"
                  name="medicine"
                  value={medicine}
                  required={true}
                  onChange={(event) => setMedicine(event.target.value)}
                />
              )}
            />

            {
              mode == UserFormConstants.USER_FORM_MODES.SIGN_UP ? (
                <FieldWithLabel
                  label={t('I am aware of and responsible for the information provided here')}
                  field={(
                    <Input
                      type="checkbox"
                      name="confirm-information"
                      checked={confirmInformation}
                      required={true}
                      onChange={() => setConfirmInformation(currentConfirmInformation => !currentConfirmInformation)}
                    />
                  )}
                />
              ) : <></>
            }
          </div>
        ) : <></>
      }

      {
        mode == UserFormConstants.USER_FORM_MODES.SIGN_UP ? (
          <p className={styles.disclaimer}>{t('I recommend that you undergo a medical examination before starting training to obtain the professional\'s approval')}</p>
        ) : <></>
      }

      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={SUBMIT_BUTTON_MAPPER[mode]?.icon}
        className={styles.btnSubmit}
      >
        {SUBMIT_BUTTON_MAPPER[mode]?.text}
      </Button>
    </form>
  );
};

const UserFormMemo = memo(UserForm);

export { UserFormMemo as UserForm };
