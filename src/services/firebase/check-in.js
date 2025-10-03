import { addDoc, collection, getDocs, getFirestore, limit, orderBy, query, where } from 'firebase/firestore';

import { DB_KEYS } from './db-keys';
import { app } from './firebase-app';

const db = getFirestore(app);

const internalLoadCheckInsByDate = async (date, userUid = null) => {
  const start = date;
  const end = new Date((new Date(date)).getTime() + 24 * 60 * 60 * 1000).toISOString(); // add 24 hours to date

  const checkInsRef = collection(db, DB_KEYS.CHECK_INS);
  const q = query(
    checkInsRef,
    userUid ? where('userUid', '==', userUid) : null,
    where('createdAt', '>=', start),
    where('createdAt', '<=', end),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshots = await getDocs(q);

  return querySnapshots.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const loadCheckIns = async (selectedUser) => {
  return internalLoadCheckIns(selectedUser?.uid);
};

export const loadCheckInsByDate = async (date, selectedUser) => {
  return internalLoadCheckInsByDate(date, selectedUser?.uid);
};

const internalLoadCheckIns = async (userUid = null) => {
  const checkInsRef = collection(db, DB_KEYS.CHECK_INS);
  const q = query(
    checkInsRef,
    userUid ? where('userUid', '==', userUid) : null,
    orderBy('createdAt', 'desc'),
    limit(100),
  );
  const querySnapshots = await getDocs(q);

  return querySnapshots.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const loadUserCheckIns = async (userUid) => {
  return internalLoadCheckIns(userUid);
};

export const loadUserCheckInsByDate = async (date, userUid) => {
  return internalLoadCheckInsByDate(date, userUid);
};

export const saveCheckIn = async (data) => {
  const checkInsRef = collection(db, DB_KEYS.CHECK_INS);

  await addDoc(checkInsRef, data);
};
