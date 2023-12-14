import dotenv from 'dotenv';

const firebaseConfig = {
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

export default firebaseConfig;
