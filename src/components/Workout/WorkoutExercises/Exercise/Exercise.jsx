import { memo, useCallback, useState } from 'react';

import { ExerciseBody } from './ExerciseBody';
import { ExerciseHeader } from './ExerciseHeader';

import styles from './Exercise.module.scss';

const Exercise = (props) => {
  const { onChangeExerciseStatus, setExerciseProperty, onRemoveExercise, onMoveUpExercise, onMoveDownExercise } = props;
  const { exercise, completedExercises, mode } = props;

  const [ isExpanded, setIsExpanded ] = useState(false);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded(currentStatus => !currentStatus);
  }, []);

  const renderExerciseBody = useCallback(() => {
    if(!exercise?.exerciseId) {
      return <></>;
    }

    return (
      <ExerciseBody
        exercise={exercise}
        completedExercises={completedExercises}
        isExpanded={isExpanded}
        onChangeExerciseStatus={onChangeExerciseStatus}
        mode={mode}
        setExerciseProperty={setExerciseProperty}
      />
    );
  }, [ exercise, completedExercises, isExpanded, onChangeExerciseStatus, mode, setExerciseProperty ]);

  return (
    <div className={styles.Exercise}>
      <ExerciseHeader
        exercise={exercise}
        isExpanded={isExpanded}
        onChangeExpandedState={onChangeExpandedState}
        mode={mode}
        setExerciseProperty={setExerciseProperty}
        onRemoveExercise={onRemoveExercise}
        onMoveUpExercise={onMoveUpExercise}
        onMoveDownExercise={onMoveDownExercise}
      />

      {renderExerciseBody()}
    </div>
  );
};

const ExerciseMemo = memo(Exercise);

export { ExerciseMemo as Exercise };
