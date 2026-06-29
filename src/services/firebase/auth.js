import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

import { app } from './firebase-app';

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Now the user's session will persist even if they close the browser
    console.log('Persistence OK');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export const resetPasswordUser = async (email) => {
  const continueURL = window.location.origin;

  await sendPasswordResetEmail(auth, email, {
    url: `${continueURL}/#/sign-in`,
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
