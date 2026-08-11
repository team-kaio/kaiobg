import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, PaperPlaneIcon, TextArea } from '@/components';
import { UserSlice, CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

const COMMENT_KEY = 'comment';

const setItemLS = (key, id, value) => {
  localStorage?.setItem(`kb-send-workout-${id}-${key}`, value);
};

const getItemLS = (key, id) => {
  const value = localStorage?.getItem(`kb-send-workout-${id}-${key}`);
  return value;
};

const removeItemLS = (key, id) => {
  localStorage?.removeItem(`kb-send-workout-${id}-${key}`);
};

const SendWorkout = (props) => {
  const { workout, completedExercises } = props;
  const { onCompleteWorkout = () => null } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ comment, setComment ] = useState(getItemLS(COMMENT_KEY, workout?.id) || '');

  const onClickSendWorkout = useCallback(() => {
    const now = utils.getDateIsoFormat(new Date());

    const { id: _, ...otherWorkoutData } = workout;

    const workoutData = {
      ...otherWorkoutData,
      createdAt: now,
      userUid: loggedUser.uid,
      comment,
      completedExercises,
    };

    dispatch(CheckInSlice.actions.saveCheckIn(workoutData));
    dispatch(UserSlice.actions.saveUser({
      lastCheckInDate: now,
      uid: loggedUser.uid,
    }));

    setComment('');
    removeItemLS(COMMENT_KEY, workout?.id);

    onCompleteWorkout();
  }, [ comment, completedExercises, dispatch, loggedUser.uid, onCompleteWorkout, workout ]);
  
  return (
    <>
      <TextArea
        value={comment}
        onChange={event => {
          setItemLS(COMMENT_KEY, workout?.id, event.target.value);
          setComment(event.target.value);
        }}
        placeholder={t('Comments about this workout')}
      />
    
      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PaperPlaneIcon />}
        onClick={onClickSendWorkout}
      >
        {t('Send')}
      </Button>
    </>
  );
};

const SendWorkoutMemo = memo(SendWorkout);

export { SendWorkoutMemo as SendWorkout };
