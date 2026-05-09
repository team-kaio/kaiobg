import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { WorkoutConstants, WorkoutsList } from '@/components';
import { UserSlice } from '@/store/slices';

const WorkoutPage = () => {
  const { t } = useTranslation();

  const [ searchParams ] = useSearchParams();

  const athleteId = searchParams.get('uid') || null;

  const workouts = useSelector(athleteId ? UserSlice.selectors.selectUserWorkoutsByUid(athleteId) : UserSlice.selectors.selectLoggedUserWorkouts);
  const workoutsWithExtra = workouts ? [
    ...workouts,
    {
      id: 'extra-activities',
      title: t('Extra Activity Log'),
      description: t('Any physical activity that is not part of the training sessions'),
      exercises: [],
    },
  ] : [];

  return (
    <>
      <h1 style={{ paddingBottom:'1rem' }}>{t('Workout')}</h1>

      {
        workouts ? (
          <WorkoutsList
            workouts={workoutsWithExtra}
            mode={WorkoutConstants.WORKOUT_MODES.REGISTER}
          />
        ) : <></>
      }
    </>
  );
};

const WorkoutPageMemo = memo(WorkoutPage);

export { WorkoutPageMemo as WorkoutPage };
