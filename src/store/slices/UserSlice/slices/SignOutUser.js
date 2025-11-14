import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  signOutStatus: REQUEST_STATUS.IDLE,
};

// Async Thunk
const asyncThunk = {
  signOutUser: createAsyncThunk(`${USER_SLICE_NAME}/signOut`, async () => await usersService.signOut()),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.signOutUser.pending, (state) => {
      state.signOutStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.signOutUser.fulfilled, (state) => {
      state.signOutStatus = REQUEST_STATUS.SUCCEEDED;
      state.loggedUser = null;
    })
    .addCase(asyncThunk.signOutUser.rejected, (state) => {
      state.signOutStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

export const SignOutUser = {
  initialState,
  asyncThunk,
  extraReducers,
};
