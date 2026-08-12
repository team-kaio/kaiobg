import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AddExerciseButton, ExerciseItem, SearchableSelect } from '@/components';
import { utils } from '@/utils';
import { ExerciseSlice } from '@/store/slices';

import styles from './ManageExercisesPage.module.scss';

const ManageExercisesPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const exercises = useSelector(ExerciseSlice.selectors.selectAllExercises);

  const [ selectedExerciseId, setSelectedExerciseId ] = useState(null);

  const handleAddNewExercise = useCallback(() => {
    dispatch(ExerciseSlice.actions.addExercise({ title: 'TEMP', videoUrl: '' }));
  }, [ dispatch ]);

  const renderSelectedItem = useCallback(() => {
    if (!selectedExerciseId && selectedExerciseId !== 0) {
      return <></>;
    }

    const exercise = exercises?.find(ex => ex.id === selectedExerciseId);
    if (exercise) {
      return <ExerciseItem key={exercise.id} item={exercise} />;
    }

    return <ExerciseItem key="new" item={{ id: utils.getUniqueId(), title: 'TEMP', videoUrl: '' }} />;
  }, [ selectedExerciseId, exercises ]);

  const renderExercisesSelect = useCallback(() => {
    if (!exercises?.length) {
      return (
        <span>{t('You don\'t have users :C')}</span>
      );
    }

    const selectOptions = exercises.map(ex => ({ label: ex.title, value: ex.id }));

    return (
      <div className={styles.ManageExercisesSelectContainer}>
        <SearchableSelect
          options={selectOptions}
          value={selectedExerciseId ?? null}
          onChange={setSelectedExerciseId}
          placeholder={t('Select an exercise')}
          searchPlaceholder={t('Search exercises...')}
          displayKey="label"
          valueKey="value"
        />
        <AddExerciseButton onClick={handleAddNewExercise} />
      </div>
    );
  }, [ t, exercises ]);

  return (
    <div className={styles.ManageExercisesPage}>
      <h1>{t('Manage Exercises')}</h1>
      <h2>{t('Select an exercise')}</h2>

      <div>
        {renderExercisesSelect()}
      </div>

      {renderSelectedItem()}
    </div>
  );
};

const ManageExercisesPageMemo = memo(ManageExercisesPage);

export { ManageExercisesPageMemo as ManageExercisesPage };
