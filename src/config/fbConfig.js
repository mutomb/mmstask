import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyDJNt2ws0UQK02--VFqRvCp6M6_X57WgHo",
  authDomain: "mmsinterview.firebaseapp.com",
  projectId: "mmsinterview",
  storageBucket: "mmsinterview.appspot.com",
  messagingSenderId: "942020023399",
  appId: "1:942020023399:web:c63a29fc707bc87e78f0c2",
  measurementId: "G-KKX3CS03EC"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 