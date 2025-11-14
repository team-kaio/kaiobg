import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { coursesService } from '@/services';

import { COURSE_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  courses: [],
  loadCoursesStatus: REQUEST_STATUS.IDLE,
  addCourseStatus: REQUEST_STATUS.IDLE,
  saveCourseStatus: REQUEST_STATUS.IDLE,
  removeCourseStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {};

// Async Thunk
const asyncThunk = {
  loadCourses: createAsyncThunk(`${COURSE_SLICE_NAME}/loadCourses`, async () => await coursesService.loadCourses()),
  loadPublishedCourses: createAsyncThunk(`${COURSE_SLICE_NAME}/loadPublishedCourses`, async () => await coursesService.loadPublishedCourses()),
  addCourse: createAsyncThunk(`${COURSE_SLICE_NAME}/addCourse`, async (data) => await coursesService.addCourse(data)),
  saveCourse: createAsyncThunk(`${COURSE_SLICE_NAME}/saveCourse`, async (data) => await coursesService.saveCourse(data)),
  removeCourse: createAsyncThunk(`${COURSE_SLICE_NAME}/removeCourse`, async (id) => await coursesService.removeCourse(id)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadCourses.pending, (state) => {
      state.loadCoursesStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadCourses.fulfilled, (state, action) => {
      state.loadCoursesStatus = REQUEST_STATUS.SUCCEEDED;
      state.courses = action.payload;
    })
    .addCase(asyncThunk.loadCourses.rejected, (state) => {
      state.loadCoursesStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.loadPublishedCourses.pending, (state) => {
      state.loadCoursesStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadPublishedCourses.fulfilled, (state, action) => {
      state.loadCoursesStatus = REQUEST_STATUS.SUCCEEDED;
      state.courses = action.payload;
    })
    .addCase(asyncThunk.loadPublishedCourses.rejected, (state) => {
      state.loadCoursesStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.addCourse.pending, (state) => {
      state.addCourseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.addCourse.fulfilled, (state, action) => {
      state.addCourseStatus = REQUEST_STATUS.SUCCEEDED;
      state.courses.unshift(action.payload);
    })
    .addCase(asyncThunk.addCourse.rejected, (state) => {
      state.addCourseStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.saveCourse.pending, (state) => {
      state.saveCourseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveCourse.fulfilled, (state, action) => {
      state.saveCourseStatus = REQUEST_STATUS.SUCCEEDED;

      const updatedCourse = action.payload;
      const existingCourseIndex = state.courses.findIndex(course => course.id == updatedCourse.id);

      state.courses[existingCourseIndex] = { ...updatedCourse };
    })
    .addCase(asyncThunk.saveCourse.rejected, (state) => {
      state.saveCourseStatus = REQUEST_STATUS.FAILED;
    });

  builder
    .addCase(asyncThunk.removeCourse.pending, (state) => {
      state.removeCourseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.removeCourse.fulfilled, (state, action) => {
      state.removeCourseStatus = REQUEST_STATUS.SUCCEEDED;

      const courseIndex = state.courses.findIndex(course => course.id == action.payload.id);
      state.courses.splice(courseIndex, 1);
    })
    .addCase(asyncThunk.removeCourse.rejected, (state) => {
      state.removeCourseStatus = REQUEST_STATUS.FAILED;
    });
};

// Selectors
const selectors = {
  selectAllCourses: (state) => {
    return state.courses.courses;
  },
  selectCourseById: (courseId) => (state) => {
    return state.courses.courses.find(course => course.id === courseId);
  },
  selectLoadCoursesStatus: (state) => {
    return state.courses.loadCoursesStatus;
  },
  selectSaveCourseMessage: (state) => {
    return state.courses.saveCourseMessage;
  },
};

export const Course = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
