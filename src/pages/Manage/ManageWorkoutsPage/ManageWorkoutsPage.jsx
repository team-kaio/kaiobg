import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, PlusIcon, SaveButton, Select, WorkoutConstants, WorkoutsList } from '@/components';
import { UserSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './ManageWorkoutsPage.module.scss';

const ManageWorkoutsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const users = useSelector(UserSlice.selectors.selectUsers);

  const [ selectedUser, setSelectedUser ] = useState(null);

  const onUpdateSelectedUserWorkout = useCallback((workoutId, property, value) => {
    const currentWorkouts = utils.deepClone(selectedUser?.workouts) || [];

    const workoutIndex = currentWorkouts.findIndex(cw => cw.id == workoutId);
    const currentWorkout = currentWorkouts[workoutIndex];

    const updatedWorkout = {
      ...currentWorkout,
      [property]: value,
    };

    const updatedWorkoutList = [
      ...currentWorkouts.slice(0, workoutIndex),
      updatedWorkout,
      ...currentWorkouts.slice(workoutIndex + 1),
    ];

    setSelectedUser((currentSelectedUser) => {
      return {
        ...currentSelectedUser,
        workouts: updatedWorkoutList,
      };
    });
  }, [ selectedUser?.workouts ]);

  const onRemoveWorkout = useCallback((workoutId) => {
    const currentWorkouts = utils.deepClone(selectedUser?.workouts) || [];
    const workoutIndex = currentWorkouts.findIndex(cw => cw.id == workoutId);

    const updatedWorkoutList = [
      ...currentWorkouts.slice(0, workoutIndex),
      ...currentWorkouts.slice(workoutIndex + 1),
    ];

    setSelectedUser((currentSelectedUser) => {
      return {
        ...currentSelectedUser,
        workouts: updatedWorkoutList,
      };
    });
  }, [ selectedUser?.workouts ]);

  const onAddWorkout = useCallback(() => {
    if(!selectedUser) {
      return;
    }

    if(!selectedUser.workouts) {
      selectedUser.workouts = [];
    }

    const currentWorkoutNumber = selectedUser.workouts.length + 1;

    const newWorkout = {
      id: utils.getUniqueId(),
      title: `Treino ${currentWorkoutNumber}`,
      description: '',
      exercises: [],
    };

    setSelectedUser((currentSelectedUser) => {
      return {
        ...currentSelectedUser,
        workouts: [
          ...selectedUser.workouts,
          newWorkout,
        ],
      };
    });
  }, [ selectedUser ]);

  const onSaveWorkouts = useCallback(() => {
    if(!selectedUser) {
      return;
    }

    const workoutsWithoutEmptyExercises = selectedUser?.workouts?.map(workout => {
      const normalizedExercises = workout.exercises.filter(exercise => exercise.exerciseId);
    
      return {
        ...workout,
        exercises: normalizedExercises,
      };
    }) || [];
    
    const normalizedWorkouts = workoutsWithoutEmptyExercises.filter(workout => workout.exercises.length > 0);

    const payload = {
      uid: selectedUser.uid,
      workouts: normalizedWorkouts,
    };

    dispatch(UserSlice.actions.saveUserWorkouts(payload));

    setSelectedUser((currentSelectedUser) => {
      return {
        ...currentSelectedUser,
        workouts: normalizedWorkouts,
      };
    });
  }, [ dispatch, selectedUser ]);

  const getUserByUid = useCallback((uid) => {
    return utils.deepClone(users.find(user => user.uid === uid));
  }, [ users ]);

  const renderSaveButton = useCallback(() => {
    if(!selectedUser) {
      return <></>;
    }

    return (
      <SaveButton onClick={onSaveWorkouts} />
    );
  }, [ onSaveWorkouts, selectedUser ]);

  const renderUsers = useCallback(() => {
    if(!users?.length) {
      return <span>{t('You don\'t have users :C')}</span>;
    }

    const renderUsers = () => {
      return users.map(user => {
        return <option key={user.uid} value={user.uid}>{user.fullName} ({user.email})</option>;
      });
    };

    return (
      <Select
        name="users"
        emptyItemText="Select an user"
        value={selectedUser?.uid}
        onChange={(event) => setSelectedUser(getUserByUid(event.target.value))}
        renderItems={renderUsers}
      />
    );
  }, [ getUserByUid, selectedUser?.uid, t, users ]);

  const renderAddWorkoutButton = useCallback(() => {
    if(!selectedUser) {
      return <></>;
    }

    return (
      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PlusIcon />}
        onClick={onAddWorkout}
      >
        {t('Add Workout')}
      </Button>
    );
  }, [ onAddWorkout, selectedUser, t ]);

  const renderSelectedUserWorkouts = useCallback(() => {
    if(!selectedUser) {
      return <></>;
    }

    return (
      <WorkoutsList
        workouts={selectedUser?.workouts}
        mode={WorkoutConstants.WORKOUT_MODES.EDIT}
        onUpdateWorkoutData={onUpdateSelectedUserWorkout}
        onRemoveWorkout={onRemoveWorkout}
      />
    );
  }, [ onRemoveWorkout, selectedUser, onUpdateSelectedUserWorkout ]);

  return (
    <div className={styles.ManageWorkoutsPage}>
      <h1>{t('Manage Workouts')}</h1>

      <div>
        {renderUsers()}
      </div>

      <div className={styles.ManageWorkoutsPageButtonsContainer}>
        {renderAddWorkoutButton()}
        {renderSaveButton()}
      </div>
      
      {renderSelectedUserWorkouts()}
    </div>
  );
};

const ManageWorkoutsPageMemo = memo(ManageWorkoutsPage);

export { ManageWorkoutsPageMemo as ManageWorkoutsPage };
