import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyAU2aueQTEg-mq5TpQZ_fAJhHWq6UVoZxM",
  authDomain: "fir-1-5dfab.firebaseapp.com",
  projectId: "fir-1-5dfab",
  storageBucket: "fir-1-5dfab.firebasestorage.app",
  messagingSenderId: "748633520053",
  appId: "1:748633520053:web:02cb87c1718860aa388bfc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export { app, db, auth };
export default db;
