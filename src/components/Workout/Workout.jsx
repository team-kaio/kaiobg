import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { WORKOUT_MODES } from './constants';
import { WorkoutExercises } from './WorkoutExercises';
import { WorkoutFooter } from './WorkoutFooter';
import { WorkoutHeader } from './WorkoutHeader';

import styles from './Workout.module.scss';

const Workout = (props) => {
  const { workout, mode, isExpanded: initialIsExpanded = false } = props;
  const { setWorkoutProperty = () => null, onRemoveWorkout = () => null } = props;

  const navigate = useNavigate();

  const [ completedExercises, setCompletedExercises ] = useState(workout.completedExercises || []);
  const [ isExpanded, setIsExpanded ] = useState(initialIsExpanded);

  const completedExercisesQty = useMemo(() => {
    return completedExercises.length;
  }, [ completedExercises.length ]);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded(currentStatus => !currentStatus);
  }, []);

  const onChangeExerciseStatus = useCallback((data) => {
    const { exerciseId, isCompleted } = data;

    setCompletedExercises(currentCompletedExercises => {
      if(isCompleted) {
        return [
          ...new Set([
            ...currentCompletedExercises,
            exerciseId,
          ]),
        ];
      }

      const arrayWithoutItem = currentCompletedExercises.filter(item => item != exerciseId);

      return [
        ...arrayWithoutItem,
      ];
    });
  }, []);

  const onCompleteWorkout = useCallback(() => {
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
