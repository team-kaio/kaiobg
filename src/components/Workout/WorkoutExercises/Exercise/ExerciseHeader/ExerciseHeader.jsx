import { memo, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ExpandCollapseArrow, RemoveIconButton, RemoveWorkoutExerciseConfirmDialog, Select, WorkoutConstants, MoveUpButton, MoveDownButton } from '@/components';
import { FIXED_EXERCISES, FIXED_EXERCISES_LIST } from '@/constants';
import { ExerciseSlice } from '@/store/slices';

import styles from './ExerciseHeader.module.scss';

const ExerciseHeader = (props) => {
  const { isExpanded, exercise, mode } = props;
  const { onChangeExpandedState, setExerciseProperty, onRemoveExercise, onMoveUpExercise, onMoveDownExercise } = props;

  const removeWorkoutExerciseDialogFnsRef = useRef(null);

  const dbExercises = useSelector(ExerciseSlice.selectors.selectAllExercises);
  const dbExercise = useSelector(ExerciseSlice.selectors.selectExerciseById(exercise?.exerciseId));

  const onClickHeader = useMemo(() => {
    return exercise?.exerciseId ? onChangeExpandedState : () => null;
  }, [ exercise?.exerciseId, onChangeExpandedState ]);

  const onClickRemoveExerciseButton = useCallback(() => {
    const removeFn = !exercise.exerciseId ? onRemoveExercise : removeWorkoutExerciseDialogFnsRef.current?.show;
    removeFn();
  }, [ exercise.exerciseId, onRemoveExercise ]);

  const onChangeSelectedExercise = useCallback((event) => {
    setExerciseProperty('exerciseId', event.target.value);
  }, [ setExerciseProperty ]);

  const renderExerciseEditMode = useCallback(() => {
    const renderExercises = () => {
      return [ ...FIXED_EXERCISES_LIST, ...dbExercises ].map(dbExercise => {
        return <option key={dbExercise.id} value={dbExercise.id}>{dbExercise.title}</option>;
      });
    };

    return (
      <>
        <MoveUpButton
          onClick={onMoveUpExercise}
        />

        <MoveDownButton
          onClick={onMoveDownExercise}
        />
        
        <Select
          name="exercises"
          emptyItemText="Select an exercise"
          value={exercise.exerciseId}
          onChange={onChangeSelectedExercise}
          renderItems={renderExercises}
        />

        <RemoveIconButton
          onClick={onClickRemoveExerciseButton}
        />
      </>
    );
  }, [ dbExercises, exercise.exerciseId, onChangeSelectedExercise, onClickRemoveExerciseButton, onMoveDownExercise, onMoveUpExercise ]);

  const renderExercise = useCallback(() => {
    if(mode != WorkoutConstants.WORKOUT_MODES.EDIT) {
      if(exercise.exerciseId == FIXED_EXERCISES.EXTERNAL_LINK.id) {
        return <></>;
      }

      return (
        <span onClick={onClickHeader}>
          {dbExercise?.title}
        </span>
      );
    }

    return renderExerciseEditMode();
  }, [ dbExercise?.title, exercise.exerciseId, mode, onClickHeader, renderExerciseEditMode ]);

  const renderArrow = useCallback(() => {
    if(!exercise?.exerciseId) {
      return <></>;
    }

    if(exercise.exerciseId == FIXED_EXERCISES.EXTERNAL_LINK.id) {
      return <></>;
    }

    return (
      <ExpandCollapseArrow
        isExpanded={isExpanded}
        onClick={onClickHeader}
      />
    );
  }, [ exercise?.exerciseId, isExpanded, onClickHeader ]);

  return (
    <div
      className={styles.ExerciseHeader}
    >
      <span className={styles.ExerciseHeaderText}>
        {renderExercise()}
      </span>

      {renderArrow()}

      {
        <RemoveWorkoutExerciseConfirmDialog
          onRemoveExercise={onRemoveExercise}
          dialogFnsRef={removeWorkoutExerciseDialogFnsRef}
        />
      }
    </div>
  );
};

const ExerciseHeaderMemo = memo(ExerciseHeader);

export { ExerciseHeaderMemo as ExerciseHeader };
