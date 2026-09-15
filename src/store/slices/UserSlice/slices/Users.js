import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { usersService } from '@/services';

import { utils } from '@/utils';

import { USER_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  users: [],
  selectedUser: null,
  selectedUserStatus: REQUEST_STATUS.IDLE,
  loadUsersStatus: REQUEST_STATUS.IDLE,
  saveUserWorkoutsStatus: REQUEST_STATUS.IDLE,
  saveUserStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {
  clearSaveUserState: (state) => {
    state.saveUserStatus = REQUEST_STATUS.IDLE;
  },
};

// Async Thunk
const asyncThunk = {
  loadUsers: createAsyncThunk(`${USER_SLICE_NAME}/loadUsers`, async () => await usersService.loadUsers()),
  loadUserByUid: createAsyncThunk(`${USER_SLICE_NAME}/loadUserByUid`, async (uid) => await usersService.loadUser({ uid })),
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
    .addCase(asyncThunk.loadUsers.rejected, (state) => {
      state.loadUsersStatus = REQUEST_STATUS.FAILED;
    })
  ;

  builder
    .addCase(asyncThunk.saveUserWorkouts.pending, (state) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveUserWorkouts.fulfilled, (state) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.SUCCEEDED;
    })
    .addCase(asyncThunk.saveUserWorkouts.rejected, (state) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.FAILED;
    })
  ;

  builder
    .addCase(asyncThunk.saveUser.pending, (state) => {
      state.saveUserStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveUser.fulfilled, (state) => {
      state.saveUserStatus = REQUEST_STATUS.SUCCEEDED;
    })
    .addCase(asyncThunk.saveUser.rejected, (state) => {
      state.saveUserStatus = REQUEST_STATUS.FAILED;
    })
  ;

  builder
    .addCase(asyncThunk.loadUserByUid.pending, (state) => {
      state.selectedUserStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadUserByUid.fulfilled, (state, action) => {
      state.selectedUserStatus = REQUEST_STATUS.SUCCEEDED;
      state.selectedUser = action.payload;
    })
    .addCase(asyncThunk.loadUserByUid.rejected, (state) => {
      state.selectedUserStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
  loadUsersStatus: (state) => state.users.loadUsersStatus,
  selectUsers: state => {
    return state?.users?.users;
  },
  selectUserByUid: (userUid) => (state) => {
    if(userUid == state.users.loggedUser?.uid) {
      return state.users.loggedUser;
    }

    const user = state.users.users.find(user => user.uid === userUid);
    const age = utils.calculateAge(state.user?.birthdate);

    return {...user, age};
  },
  selectSelectedUser: (state) => {
    return state.users.selectedUser;
  },
  selectSelectedUserStatus: (state) => {
    return state.users.selectedUserStatus;
  },
  selectUserWorkoutsByUid: (userUid) => (state) => {
    return state.users?.users?.find(user => user.uid === userUid)?.workouts;
  },
  selectSaveUserStatus: (state) => {
    return state.users.saveUserStatus;
  },
};

export const Users = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
