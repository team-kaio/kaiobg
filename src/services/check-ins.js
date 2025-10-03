import { firebaseService } from './firebase';

export const loadCheckIns = async (selectedUser) => {
  return await firebaseService.checkIn.loadCheckIns(selectedUser);
};

export const loadCheckInsByDate = async (date, selectedUser) => {
  return await firebaseService.checkIn.loadCheckInsByDate(date, selectedUser);
};

export const loadUserCheckIns = async (userUid) => {
  return await firebaseService.checkIn.loadUserCheckIns(userUid);
};

export const loadUserCheckInsByDate = async (date, userUid) => {
  return await firebaseService.checkIn.loadUserCheckInsByDate(date, userUid);
};

export const saveCheckIn = async (data) => {
  return await firebaseService.checkIn.saveCheckIn(data);
};
