import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  users: [],
  loadUsersStatus: REQUEST_STATUS.IDLE,
  loadUsersError: null,

  saveUserWorkoutsStatus: REQUEST_STATUS.IDLE,
  saveUserWorkoutsError: null,
  saveUserWorkoutsMessage: null,

  saveUserStatus: REQUEST_STATUS.IDLE,
  saveUserError: null,
  saveUserSuccessMessage: null,
};

// Reducers
const reducers = {
  clearLoadUsersError: (state) => {
    state.loadUsersError = null;
  },
  clearSaveUserWorkoutsError: (state) => {
    state.saveUserWorkoutsError = null;
  },
  clearSaveUserWorkoutsMessage: (state) => {
    state.saveUserWorkoutsMessage = null;
  },
  clearSaveUserSuccessMessage: (state) => {
    state.saveUserSuccessMessage = null;
  },
  clearSaveUserState: (state) => {
    state.saveUserStatus = REQUEST_STATUS.IDLE;
  },
  clearSaveUserError: (state) => {
    state.saveUserError = null;
  },
};

// Async Thunk
const asyncThunk = {
  loadUsers: createAsyncThunk(`${USER_SLICE_NAME}/loadUsers`, async () => await usersService.loadUsers()),
  saveUserWorkouts: createAsyncThunk(`${USER_SLICE_NAME}/saveUserWorkouts`, async (data) => await usersService.saveUserWorkouts(data)),
  saveUser: createAsyncThunk(`${USER_SLICE_NAME}/saveUser`, async (data) => await usersService.saveUser(data)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadUsers.pending, (state) => {
      state.loadUsersStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadUsers.fulfilled, (state, action) => {
      state.loadUsersStatus = REQUEST_STATUS.SUCCEEDED;
      state.users = action.payload;
    })
    .addCase(asyncThunk.loadUsers.rejected, (state, action) => {
      state.loadUsersStatus = REQUEST_STATUS.FAILED;
      state.loadUsersError = t(`error-message.load-users.${action.error.code}`);
    })
  ;

  builder
    .addCase(asyncThunk.saveUserWorkouts.pending, (state) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveUserWorkouts.fulfilled, (state) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.SUCCEEDED;
      state.saveUserWorkoutsMessage = t('Workout saved');
    })
    .addCase(asyncThunk.saveUserWorkouts.rejected, (state, action) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.FAILED;
      state.saveUserWorkoutsError = t(`error-message.save-user-workouts.${action.error.code}`);
    })
  ;

  builder
    .addCase(asyncThunk.saveUser.pending, (state) => {
      state.saveUserStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveUser.fulfilled, (state) => {
      state.saveUserStatus = REQUEST_STATUS.SUCCEEDED;
      state.saveUserSuccessMessage = t('Saved');
    })
    .addCase(asyncThunk.saveUser.rejected, (state, action) => {
      state.saveUserStatus = REQUEST_STATUS.FAILED;
      state.saveUserError = t(`error-message.save-user.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectUsers: state => {
    return state.users.users;
  },
  selectUserByUid: (userUid) => (state) => {
    return state.users.users.find(user => user.uid === userUid);
  },
  selectUserWorkoutsByUid: (userUid) => (state) => {
    return state.users?.users?.find(user => user.uid === userUid)?.workouts;
  },
  selectLoadUsersError: (state) => {
    return state.users.loadUsersError;
  },
  selectSaveUserWorkoutsError: (state) => {
    return state.users.saveUserWorkoutsError;
  },
  selectSaveUserWorkoutsMessage: (state) => {
    return state.users.saveUserWorkoutsMessage;
  },
  selectSaveUserError: (state) => {
    return state.users.saveUserError;
  },
  selectSaveUserStatus: (state) => {
    return state.users.saveUserStatus;
  },
  selectSaveUserSuccessMessage: (state) => {
    return state.users.saveUserSuccessMessage;
  },
};

export const Users = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
