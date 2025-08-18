import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyDDccXeXTfHZOn5LPPZ63fjVvAwJnkWUWo",
  authDomain: "schemewatchtest.firebaseapp.com",
  projectId: "schemewatchtest",
  storageBucket: "schemewatchtest.firebasestorage.app",
  messagingSenderId: "169541157876",
  appId: "1:169541157876:web:2642120a28e2e6ee0c2fa1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export { app, db, auth };
export default db;
