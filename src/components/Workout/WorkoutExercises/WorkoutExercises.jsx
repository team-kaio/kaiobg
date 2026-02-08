import { memo, useCallback } from 'react';

import { AddExerciseButton } from '@/components/Buttons/AddExerciseButton';
import { utils } from '@/utils';

import { WORKOUT_MODES } from '../constants';

import { Exercise } from './Exercise';

import styles from './WorkoutExercises.module.scss';

const WorkoutExercises = (props) => {
  const { exercises, completedExercises, mode } = props;
  const { onChangeExerciseStatus, setWorkoutProperty } = props;

  const onAddExercise = useCallback(() => {
    const updatedExercises = [
      ...exercises,
      {
        id: utils.getUniqueId(),
        exerciseId: null,
        sets: '',
        reps: '',
        weight: '',
        rest: '',
      },
    ];

    setWorkoutProperty('exercises', updatedExercises);
  }, [ exercises, setWorkoutProperty ]);

  const renderAddExerciseButton = useCallback(() => {
    if(mode != WORKOUT_MODES.EDIT) {
      return <></>;
    }

    return (
      <AddExerciseButton onClick={onAddExercise} />
    );
  }, [ mode, onAddExercise ]);

  return (
    <div className={styles.WorkoutExercises}>
      {renderAddExerciseButton()}

      {exercises.map(exercise => {
        const setExerciseProperty = (property, value) => {
          const exerciseIndex = exercises.findIndex(e => e.id == exercise.id);

          const updatedExercise = {
            ...exercise,
            [property]: value,
          };

          const updatedExercises = [
            ...exercises.slice(0, exerciseIndex),
            updatedExercise,
            ...exercises.slice(exerciseIndex + 1),
          ];

          setWorkoutProperty('exercises', updatedExercises);
        };

        const onMoveUpExercise = () => {
          const exerciseIndex = exercises.findIndex(e => e.id == exercise.id);

          if(exerciseIndex === 0) {
            return;
          }

          const previousExercise = exercises[exerciseIndex - 1];

          const updatedExercises = [
            ...exercises.slice(0, exerciseIndex - 1),
            exercise,
            previousExercise,
            ...exercises.slice(exerciseIndex + 1),
          ];

          setWorkoutProperty('exercises', updatedExercises);
        };

        const onMoveDownExercise = () => {
          const exerciseIndex = exercises.findIndex(e => e.id == exercise.id);

          if(exerciseIndex >= (exercises.length - 1)) {
            return;
          }

          const nextExercise = exercises[exerciseIndex + 1];

          const updatedExercises = [
            ...exercises.slice(0, exerciseIndex),
            nextExercise,
            exercise,
            ...exercises.slice(exerciseIndex + 2),
          ];

          setWorkoutProperty('exercises', updatedExercises);
        };

        const onRemoveExercise = () => {
          const exerciseIndex = exercises.findIndex(e => e.id == exercise.id);

          const updatedExercises = [
            ...exercises.slice(0, exerciseIndex),
            ...exercises.slice(exerciseIndex + 1),
          ];

          setWorkoutProperty('exercises', updatedExercises);
        };

        return (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            completedExercises={completedExercises}
            onChangeExerciseStatus={onChangeExerciseStatus}
            mode={mode}
            setExerciseProperty={setExerciseProperty}
            onRemoveExercise={onRemoveExercise}
            onMoveUpExercise={onMoveUpExercise}
            onMoveDownExercise={onMoveDownExercise}
          />
        );
      })}
    </div>
  );
};

const WorkoutExercisesMemo = memo(WorkoutExercises);

export { WorkoutExercisesMemo as WorkoutExercises };
