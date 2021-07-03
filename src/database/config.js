import Firebase from 'firebase';
import 'firebase/storage';

let config = {
  apiKey: 'AIzaSyB7cLTz-3BHKo6nl6vKcZ0MElfwZPg10hw',
  authDomain: 'tukangac-1385d.firebaseapp.com',
  databaseURL:
    'https://tukangac-1385d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'tukangac-1385d',
  storageBucket: 'tukangac-1385d.appspot.com',
  messagingSenderId: '291760450111',
  appId: '1:291760450111:web:426e97f0295d971b57e68a',
};
let app = Firebase.initializeApp(config);
export const db = app.database();
export default app;
