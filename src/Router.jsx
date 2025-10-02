import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider, useLocation, useNavigate, useSearchParams } from 'react-router';

import { DefaultLayout } from '@/layouts';
import {
  AthleteAreaPage,
  CheckInsPage,
  CoursePage,
  CoursePageStatic,
  CoursesPage,
  HomePage,
  ManageCheckInsPage,
  ManageCoursesPage,
  ManageExercisesPage,
  ManagePage,
  ManagePublicationsPage,
  ManageUsersPage,
  ManageWorkoutsPage,
  PublicationPage,
  PublicationsPage,
  ResumePage,
  SignInPage,
  SignUpPage,
  WorkoutPage,
  ResetPasswordPage,
} from '@/pages';
import { UserSlice } from '@/store/slices';

const CheckLoginRedirectRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || '/';

      navigate(redirectUrl, { replace: true });
    }
  }, [ isLoggedIn, navigate, searchParams ]);

  return children;
};

const ProtectedRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);
  const isLoginVerificationComplete = useSelector(UserSlice.selectors.isLoginVerificationComplete);

  useEffect(() => {
    if (!isLoggedIn) {
      const currentPath = location.pathname + location.search;
      const urlParam = isLoginVerificationComplete ? '' : `?url=${currentPath}`;

      navigate(`/sign-in${urlParam}`, { replace: true });
    }

    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || null;

      redirectUrl && navigate(redirectUrl, { replace: true });
    }
  }, [ isLoggedIn, isLoginVerificationComplete, location.pathname, location.search, navigate, searchParams ]);

  return children;
};

const ProtectedAdminRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);
  const isLoginVerificationComplete = useSelector(UserSlice.selectors.isLoginVerificationComplete);
  const isAdmin = loggedUser?.isAdmin;

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const urlParam = isLoginVerificationComplete ? '' : `?url=${currentPath}`;
    
    if (!isLoggedIn) {
      navigate(`/sign-in${urlParam}`, { replace: true });
    }

    if(!isAdmin) {
      navigate(`/sign-in${urlParam}`, { replace: true });
    }

    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || null;

      redirectUrl && navigate(redirectUrl, { replace: true });
    }
  }, [ isAdmin, isLoggedIn, isLoginVerificationComplete, location.pathname, location.search, navigate, searchParams ]);

  return children;
};

const router = createHashRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'athlete',
        element: (
          <ProtectedRoute>
            <AthleteAreaPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'workout',
        element: (
          <ProtectedRoute>
            <WorkoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'check-ins',
        element: (
          <ProtectedRoute>
            <CheckInsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <CheckLoginRedirectRoute>
            <SignInPage />
          </CheckLoginRedirectRoute>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <CheckLoginRedirectRoute>
            <SignUpPage />
          </CheckLoginRedirectRoute>
        ),
      },
      {
        path: 'resume',
        element: (
          <ResumePage />
        ),
      },
      {
        path: 'publications',
        element: (
          <PublicationsPage />
        ),
      },
      {
        path: 'courses',
        element: (
          <CoursesPage />
        ),
      },
      {
        path: 'publication',
        element: (
          <PublicationPage />
        ),
      },
      {
        path: 'course',
        element: (
          <CoursePage />
        ),
      },
      {
        path: 'ebook-ansiedade-esporte',
        element: (
          <CoursePageStatic />
        ),
      },
      {
        path: 'reset-password',
        element: (
          <ResetPasswordPage />
        ),
      },
    ],
  },
  {
    path: '/manage',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedAdminRoute>
            <ManagePage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'exercises',
        element: (
          <ProtectedAdminRoute>
            <ManageExercisesPage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'workouts',
        element: (
          <ProtectedAdminRoute>
            <ManageWorkoutsPage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'check-ins',
        element: (
          <ProtectedAdminRoute>
            <ManageCheckInsPage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'publications',
        element: (
          <ProtectedAdminRoute>
            <ManagePublicationsPage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'courses',
        element: (
          <ProtectedAdminRoute>
            <ManageCoursesPage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedAdminRoute>
            <ManageUsersPage />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
};

export { Router };
