import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AddExerciseButton, ExerciseList } from '@/components';
import { ExerciseSlice } from '@/store/slices';

import styles from './ManageExercisesPage.module.scss';

const ManageExercisesPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const exercises = useSelector(ExerciseSlice.selectors.selectAllExercises);

  const onAddItem = useCallback(() => {
    dispatch(ExerciseSlice.actions.addExercise({ title: 'TEMP', videoUrl: '' }));
  }, [ dispatch ]);

  return (
    <div className={styles.ManageExercisesPage}>
      <h1>{t('Manage Exercises')}</h1>

      <AddExerciseButton onClick={onAddItem} />

      {exercises?.length ? (
        <ExerciseList
          items={exercises}
        />
      ) : <></>}
    </div>
  );
};

const ManageExercisesPageMemo = memo(ManageExercisesPage);

export { ManageExercisesPageMemo as ManageExercisesPage };
