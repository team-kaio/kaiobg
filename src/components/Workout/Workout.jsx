import { useCallback, memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { WORKOUT_MODES } from './constants';
import { WorkoutExercises } from './WorkoutExercises';
import { WorkoutFooter } from './WorkoutFooter';
import { WorkoutHeader } from './WorkoutHeader';

import { getItemLS, setItemLS, removeItemLS } from '@/utils/fns';

import styles from './Workout.module.scss';

const COMPLETED_EXERCISES_KEY = 'completedExercises';
const IS_EXPANDED_KEY = 'isExpanded';

const getWorkoutKey = (id, field) => `kb-workout-${id}-${field}`;

const Workout = (props) => {
  const { workout, mode, isExpanded: initialIsExpanded = false } = props;
  const { setWorkoutProperty = () => null, onRemoveWorkout = () => null } = props;

  const navigate = useNavigate();

  const [ completedExercises, setCompletedExercises ] = useState(getItemLS(getWorkoutKey(workout?.id, COMPLETED_EXERCISES_KEY), true) || workout?.completedExercises || []);
  const [ isExpanded, setIsExpanded ] = useState(getItemLS(getWorkoutKey(workout?.id, IS_EXPANDED_KEY)) || initialIsExpanded);

  const completedExercisesQty = useMemo(() => {
    return completedExercises.length;
  }, [ completedExercises.length ]);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded(currentStatus => {
      setItemLS(getWorkoutKey(workout?.id, IS_EXPANDED_KEY), !currentStatus);
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

        setItemLS(getWorkoutKey(workout?.id, COMPLETED_EXERCISES_KEY), updatedValue, true);
        return updatedValue;
      }

      const arrayWithoutItem = currentCompletedExercises.filter(item => item != exerciseId);
      const updatedValue = [
        ...arrayWithoutItem,
      ];

      setItemLS(getWorkoutKey(workout?.id, COMPLETED_EXERCISES_KEY), updatedValue, true);

      return updatedValue;
    });
  }, []);

  const onCompleteWorkout = useCallback(() => {
    removeItemLS(getWorkoutKey(workout?.id, COMPLETED_EXERCISES_KEY));
    removeItemLS(getWorkoutKey(workout?.id, IS_EXPANDED_KEY));
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
