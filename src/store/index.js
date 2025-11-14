import { configureStore } from '@reduxjs/toolkit';

import { thunkGrowlMiddleware } from './middlewares';
import { ExerciseSlice, UserSlice, CheckInSlice, PublicationSlice, CourseSlice, GrowlSlice } from './slices';

export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    exercises: ExerciseSlice.reducer,
    checkIns: CheckInSlice.reducer,
    publications: PublicationSlice.reducer,
    courses: CourseSlice.reducer,
    growls: GrowlSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunkGrowlMiddleware);
  },
});
