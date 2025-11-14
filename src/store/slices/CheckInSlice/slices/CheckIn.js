import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { checkInsService } from '@/services';

import { CHECK_IN_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  checkIns: [],
  loadCheckInsStatus: REQUEST_STATUS.IDLE,
  saveCheckInStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {};

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
  loadCheckInsByDate: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/loadCheckInsByDate`, async ({ date, user }) => await checkInsService.loadCheckInsByDate(date, user)),
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
    .addCase(asyncThunk.loadCheckIns.rejected, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.loadUserCheckIns.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadUserCheckIns.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadUserCheckIns.rejected, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.loadCheckInsByDate.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadCheckInsByDate.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadCheckInsByDate.rejected, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.loadUserCheckInsByDate.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadUserCheckInsByDate.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadUserCheckInsByDate.rejected, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.saveCheckIn.pending, (state) => {
      state.saveCheckInStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveCheckIn.fulfilled, (state) => {
      state.saveCheckInStatus = REQUEST_STATUS.SUCCEEDED;
    })
    .addCase(asyncThunk.saveCheckIn.rejected, (state) => {
      state.saveCheckInStatus = REQUEST_STATUS.FAILED;
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
