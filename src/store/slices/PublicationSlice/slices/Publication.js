import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { publicationsService } from '@/services';

import { PUBLICATION_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  publications: [],
  loadPublicationsStatus: REQUEST_STATUS.IDLE,
  addPublicationStatus: REQUEST_STATUS.IDLE,
  savePublicationStatus: REQUEST_STATUS.IDLE,
  removePublicationStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {};

// Async Thunk
const asyncThunk = {
  loadPublications: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/loadPublications`, async () => await publicationsService.loadPublications()),
  loadPublishedPublications: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/loadPublishedPublications`, async () => await publicationsService.loadPublishedPublications()),
  addPublication: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/addPublication`, async (data) => await publicationsService.addPublication(data)),
  savePublication: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/savePublication`, async (data) => await publicationsService.savePublication(data)),
  removePublication: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/removePublication`, async (id) => await publicationsService.removePublication(id)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadPublications.pending, (state) => {
      state.loadPublicationsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadPublications.fulfilled, (state, action) => {
      state.loadPublicationsStatus = REQUEST_STATUS.SUCCEEDED;
      state.publications = action.payload;
    })
    .addCase(asyncThunk.loadPublications.rejected, (state) => {
      state.loadPublicationsStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.loadPublishedPublications.pending, (state) => {
      state.loadPublicationsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadPublishedPublications.fulfilled, (state, action) => {
      state.loadPublicationsStatus = REQUEST_STATUS.SUCCEEDED;
      state.publications = action.payload;
    })
    .addCase(asyncThunk.loadPublishedPublications.rejected, (state) => {
      state.loadPublicationsStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.addPublication.pending, (state) => {
      state.addPublicationStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.addPublication.fulfilled, (state, action) => {
      state.addPublicationStatus = REQUEST_STATUS.SUCCEEDED;
      state.publications.unshift(action.payload);
    })
    .addCase(asyncThunk.addPublication.rejected, (state) => {
      state.addPublicationStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.savePublication.pending, (state) => {
      state.savePublicationStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.savePublication.fulfilled, (state, action) => {
      state.savePublicationStatus = REQUEST_STATUS.SUCCEEDED;

      const updatedPublication = action.payload;
      const existingPublicationIndex = state.publications.findIndex(publication => publication.id == updatedPublication.id);

      state.publications[existingPublicationIndex] = { ...updatedPublication };
    })
    .addCase(asyncThunk.savePublication.rejected, (state) => {
      state.savePublicationStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.removePublication.pending, (state) => {
      state.removePublicationStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.removePublication.fulfilled, (state, action) => {
      state.removePublicationStatus = REQUEST_STATUS.SUCCEEDED;

      const publicationIndex = state.publications.findIndex(publication => publication.id == action.payload.id);
      state.publications.splice(publicationIndex, 1);
    })
    .addCase(asyncThunk.removePublication.rejected, (state) => {
      state.removePublicationStatus = REQUEST_STATUS.FAILED;
    });
};

// Selectors
const selectors = {
  selectAllPublications: (state) => {
    return state.publications.publications;
  },
  selectPublicationById: (publicationId) => (state) => {
    return state.publications.publications.find(publication => publication.id === publicationId);
  },
  selectLoadPublicationsStatus: (state) => {
    return state.publications.loadPublicationsStatus;
  },
};

export const Publication = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
