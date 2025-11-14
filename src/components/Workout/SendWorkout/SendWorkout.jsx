import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, PaperPlaneIcon, TextArea } from '@/components';
import { UserSlice, CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

const SendWorkout = (props) => {
  const { workout, completedExercises } = props;
  const { onCompleteWorkout = () => null } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ comment, setComment ] = useState('');

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

    onCompleteWorkout();
  }, [ comment, completedExercises, dispatch, loggedUser.uid, onCompleteWorkout, workout ]);
  
  return (
    <>
      <TextArea
        value={comment}
        onChange={event => setComment(event.target.value)}
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
