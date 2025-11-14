import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { exercisesService } from '@/services';

import { EXERCISE_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  exercises: [],
  loadExercisesStatus: REQUEST_STATUS.IDLE,
  addExerciseStatus: REQUEST_STATUS.IDLE,
  saveExerciseStatus: REQUEST_STATUS.IDLE,
  removeExerciseStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {};

// Async Thunk
const asyncThunk = {
  loadExercises: createAsyncThunk(`${EXERCISE_SLICE_NAME}/loadExercises`, async () => await exercisesService.loadExercises()),
  addExercise: createAsyncThunk(`${EXERCISE_SLICE_NAME}/addExercise`, async (data) => await exercisesService.addExercise(data)),
  saveExercise: createAsyncThunk(`${EXERCISE_SLICE_NAME}/saveExercise`, async (data) => await exercisesService.saveExercise(data)),
  removeExercise: createAsyncThunk(`${EXERCISE_SLICE_NAME}/removeExercise`, async (id) => await exercisesService.removeExercise(id)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadExercises.pending, (state) => {
      state.loadExercisesStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadExercises.fulfilled, (state, action) => {
      state.loadExercisesStatus = REQUEST_STATUS.SUCCEEDED;
      state.exercises = action.payload;
    })
    .addCase(asyncThunk.loadExercises.rejected, (state) => {
      state.loadExercisesStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.addExercise.pending, (state) => {
      state.addExerciseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.addExercise.fulfilled, (state, action) => {
      state.addExerciseStatus = REQUEST_STATUS.SUCCEEDED;
      state.exercises.unshift(action.payload);
    })
    .addCase(asyncThunk.addExercise.rejected, (state) => {
      state.addExerciseStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.saveExercise.pending, (state) => {
      state.saveExerciseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveExercise.fulfilled, (state, action) => {
      state.saveExerciseStatus = REQUEST_STATUS.SUCCEEDED;

      const updatedExercise = action.payload;
      const existingExerciseIndex = state.exercises.findIndex(exercise => exercise.id == updatedExercise.id);

      state.exercises[existingExerciseIndex] = { ...updatedExercise };
    })
    .addCase(asyncThunk.saveExercise.rejected, (state) => {
      state.saveExerciseStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.removeExercise.pending, (state) => {
      state.removeExerciseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.removeExercise.fulfilled, (state, action) => {
      state.removeExerciseStatus = REQUEST_STATUS.SUCCEEDED;

      const exerciseIndex = state.exercises.findIndex(exercise => exercise.id == action.payload.id);
      state.exercises.splice(exerciseIndex, 1);
    })
    .addCase(asyncThunk.removeExercise.rejected, (state) => {
      state.removeExerciseStatus = REQUEST_STATUS.FAILED;
    });
};

// Selectors
const selectors = {
  selectAllExercises: (state) => {
    return state.exercises.exercises;
  },
  selectExerciseById: (exerciseId) => (state) => {
    return state.exercises.exercises.find(exercise => exercise.id === exerciseId);
  },
  selectLoadExercisesStatus: (state) => {
    return state.exercises.loadExercisesStatus;
  },
};

export const Exercise = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
