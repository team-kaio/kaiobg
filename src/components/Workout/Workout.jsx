import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { WORKOUT_MODES } from './constants';
import { WorkoutExercises } from './WorkoutExercises';
import { WorkoutFooter } from './WorkoutFooter';
import { WorkoutHeader } from './WorkoutHeader';

import styles from './Workout.module.scss';

const COMPLETED_EXERCISES_KEY = 'completedExercises';
const IS_EXPANDED_KEY = 'isExpanded';

const setItemLS = (key, id, value, stringify = false) => {
  localStorage?.setItem(`kb-workout-${id}-${key}`, stringify ? JSON.stringify(value) : value);
};

const getItemLS = (key, id, parse = false) => {
  const value = localStorage?.getItem(`kb-workout-${id}-${key}`);
  const normalizedValue = parse ? JSON.parse(value) : value;
  return normalizedValue;
};

const removeItemLS = (key, id) => {
  localStorage?.removeItem(`kb-workout-${id}-${key}`);
};

const Workout = (props) => {
  const { workout, mode, isExpanded: initialIsExpanded = false } = props;
  const { setWorkoutProperty = () => null, onRemoveWorkout = () => null } = props;

  const navigate = useNavigate();

  const [ completedExercises, setCompletedExercises ] = useState(getItemLS(COMPLETED_EXERCISES_KEY, workout?.id, true) || workout?.completedExercises || []);
  const [ isExpanded, setIsExpanded ] = useState(getItemLS(IS_EXPANDED_KEY, workout?.id) || initialIsExpanded);

  const completedExercisesQty = useMemo(() => {
    return completedExercises.length;
  }, [ completedExercises.length ]);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded(currentStatus => {
      setItemLS(IS_EXPANDED_KEY, workout?.id, !currentStatus);
      return !currentStatus;
    });
  }, []);

  const onChangeExerciseStatus = useCallback((data) => {
    const { exerciseId, isCompleted } = data;

    setCompletedExercises(currentCompletedExercises => {
      if(isCompleted) {
        const updatedValue = [
          ...new Set([
            ...currentCompletedExercises,
            exerciseId,
          ]),
        ];

        setItemLS(COMPLETED_EXERCISES_KEY, workout?.id, updatedValue, true);
        return updatedValue;
      }

      const arrayWithoutItem = currentCompletedExercises.filter(item => item != exerciseId);
      const updatedValue = [
        ...arrayWithoutItem,
      ];

      setItemLS(COMPLETED_EXERCISES_KEY, workout?.id, updatedValue, true);

      return updatedValue;
    });
  }, []);

  const onCompleteWorkout = useCallback(() => {
    removeItemLS(COMPLETED_EXERCISES_KEY, workout?.id);
    removeItemLS(IS_EXPANDED_KEY, workout?.id);
    navigate('/athlete', { replace: true });
  }, [ navigate ]);

  return (
    <div className={styles.Workout}>
      <WorkoutHeader
        workout={workout}
        totalExercises={workout.exercises.length}
        isExpanded={isExpanded}
        onChangeExpandedState={onChangeExpandedState}
        completedExercisesQty={completedExercisesQty}
        mode={mode}
        setWorkoutProperty={setWorkoutProperty}
      />

      <div style={{ display: isExpanded ? 'block' : 'none' }}>
        <WorkoutExercises
          exercises={workout.exercises}
          completedExercises={completedExercises}
          onChangeExerciseStatus={onChangeExerciseStatus}
          mode={mode}
          setWorkoutProperty={setWorkoutProperty}
        />

        {mode === WORKOUT_MODES.REGISTER ? (
          <WorkoutFooter
            workout={workout}
            completedExercises={completedExercises}
            mode={mode}
            onRemoveWorkout={onRemoveWorkout}
            onCompleteWorkout={onCompleteWorkout}
          />
        ) : <></>}
      </div>

      {mode != WORKOUT_MODES.REGISTER ? (
        <WorkoutFooter
          workout={workout}
          completedExercises={completedExercises}
          mode={mode}
          onRemoveWorkout={onRemoveWorkout}
          onCompleteWorkout={onCompleteWorkout}
        />
      ) : <></>}

    </div>
  );
};

const WorkoutMemo = memo(Workout);

export { WorkoutMemo as Workout };
