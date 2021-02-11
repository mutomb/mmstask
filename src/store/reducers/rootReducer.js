import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer, //  add and sync firestore to Redux Store's state
  firebase: firebaseReducer // add and sync firebase to Redux Store's state; used for authentication
});

export default rootReducer

// the key name will be the data property on the state object