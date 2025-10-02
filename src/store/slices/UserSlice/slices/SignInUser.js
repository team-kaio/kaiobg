import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  signInStatus: REQUEST_STATUS.IDLE,
  signInError: null,
  resetPasswordStatus: REQUEST_STATUS.IDLE,
  resetPasswordError: null,
  resetPasswordSuccess: null,
};

// Reducers
const reducers = {
  clearSignInError: (state) => {
    state.signInError = null;
  },
  clearResetPasswordError: (state) => {
    state.resetPasswordError = null;
  },
  clearResetPasswordSuccess: (state) => {
    state.resetPasswordSuccess = null;
  },
};

// Async Thunk
const asyncThunk = {
  signInUser: createAsyncThunk(`${USER_SLICE_NAME}/signInUser`, async (user) => await usersService.signInUser(user)),
  resetPasswordUser: createAsyncThunk(`${USER_SLICE_NAME}/resetPasswordUser`, async (email) => await usersService.resetPasswordUser(email)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.signInUser.pending, (state) => {
      state.signInStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.signInUser.fulfilled, (state, action) => {
      state.signInStatus = REQUEST_STATUS.SUCCEEDED;
      state.loggedUser = action.payload;
    })
    .addCase(asyncThunk.signInUser.rejected, (state, action) => {
      state.signInStatus = REQUEST_STATUS.FAILED;
      state.signInError = t(`error-message.sign-in-user.${action.error.code}`);
    })

    .addCase(asyncThunk.resetPasswordUser.pending, (state) => {
      state.resetPasswordStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.resetPasswordUser.fulfilled, (state) => {
      state.resetPasswordStatus = REQUEST_STATUS.SUCCEEDED;
      state.resetPasswordSuccess = t('Email sent');
    })
    .addCase(asyncThunk.resetPasswordUser.rejected, (state, action) => {
      state.resetPasswordStatus = REQUEST_STATUS.FAILED;
      state.resetPasswordError = t(`error-message.reset-password-user.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectSignInError: (state) => {
    return state.users.signInError;
  },
  selectResetPasswordError: (state) => {
    return state.users.resetPasswordError;
  },
  selectResetPasswordSuccess: (state) => {
    return state.users.resetPasswordSuccess;
  },
};

export const SignInUser = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
