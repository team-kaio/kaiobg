import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { app } from './firebase-app';

export const auth = getAuth(app);

export const resetPasswordUser = async (email) => {
  const continueURL = window.location.origin;

  await sendPasswordResetEmail(auth, email, {
    url: `${continueURL}/login/`,
  });
};

export const signIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const signUp = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return user;
};
