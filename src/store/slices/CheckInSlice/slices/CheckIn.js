import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { checkInsService } from '@/services';

import { CHECK_IN_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  checkIns: [],
  loadCheckInsStatus: REQUEST_STATUS.IDLE,
  loadCheckInsError: null,

  saveCheckInStatus: REQUEST_STATUS.IDLE,
  saveCheckInError: null,
  saveCheckInMessage: null,
};

// Reducers
const reducers = {
  clearLoadCheckInsError: (state) => {
    state.loadCheckInsError = null;
  },
  clearSaveCheckInError: (state) => {
    state.saveCheckInError = null;
  },
  clearSaveCheckInMessage: (state) => {
    state.saveCheckInMessage = null;
  },
};

// Async Thunk
const asyncThunk = {
  loadCheckIns: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/loadCheckIns`, async (selectedUser) => await checkInsService.loadCheckIns(selectedUser)),
  loadUserCheckIns: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/loadUserCheckIns`, async (_, { getState }) => {
    const state = await getState();

    if(!state.users.loggedUser) {
      return [];
    }

    return await checkInsService.loadUserCheckIns(state.users.loggedUser.uid);
  }),
  loadCheckInsByDate: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/loadCheckInsByDate`, async (date, selectedUser) => await checkInsService.loadCheckInsByDate(date, selectedUser)),
  loadUserCheckInsByDate: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/loadUserCheckInsByDate`, async (date, { getState }) => {
    const state = await getState();

    if(!state.users.loggedUser) {
      return [];
    }

    return await checkInsService.loadUserCheckInsByDate(date, state.users.loggedUser.uid);
  }),
  saveCheckIn: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/saveCheckIn`, async (data) => await checkInsService.saveCheckIn(data)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadCheckIns.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadCheckIns.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadCheckIns.rejected, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
      console.error(action.error);
      state.loadCheckInsError = t(`error-message.load-check-ins.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.loadUserCheckIns.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadUserCheckIns.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadUserCheckIns.rejected, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
      console.error(action.error);
      state.loadCheckInsError = t(`error-message.load-check-ins.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.loadCheckInsByDate.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadCheckInsByDate.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadCheckInsByDate.rejected, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
      console.error(action.error);
      state.loadCheckInsError = t(`error-message.load-check-ins.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.loadUserCheckInsByDate.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadUserCheckInsByDate.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadUserCheckInsByDate.rejected, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
      console.error(action.error);
      state.loadCheckInsError = t(`error-message.load-check-ins.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.saveCheckIn.pending, (state) => {
      state.saveCheckInStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveCheckIn.fulfilled, (state) => {
      state.saveCheckInStatus = REQUEST_STATUS.SUCCEEDED;
      state.saveCheckInMessage = t('Check-in saved');
    })
    .addCase(asyncThunk.saveCheckIn.rejected, (state, action) => {
      state.saveCheckInStatus = REQUEST_STATUS.FAILED;
      console.error(action.error);
      state.saveCheckInError = t(`error-message.save-check-in.${action.error.code}`);
    });
};

// Selectors
const selectors = {
  selectAllCheckIns: (state) => {
    return state.checkIns.checkIns || [];
  },
  selectUserCheckIns: (state) => {
    return state.checkIns.checkIns || [];
  },
  selectLoadCheckInsError: (state) => {
    return state.checkIns.loadCheckInsError;
  },
  selectSaveCheckInError: (state) => {
    return state.checkIns.saveCheckInError;
  },
  selectSaveCheckInMessage: (state) => {
    return state.checkIns.saveCheckInMessage;
  },
  selectIsLoadingCheckInsStatus: (state) => {
    return state.checkIns.loadCheckInsStatus === REQUEST_STATUS.LOADING;
  },
};

export const CheckIn = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
