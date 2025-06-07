// authService.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config'; // Adjust path as needed

export async function loginWithEmailPassword(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Fetch user data from Firestore
  const userDoc = await getDoc(doc(db, 'Users', user.uid));
  if (!userDoc.exists()) {
    throw new Error('No user profile found in Firestore');
  }

  const userData = userDoc.data();

  // Optional: enforce role-based access
  if (!userData.role || (userData.role !== 'admin' && userData.role !== 'Research Officer')) {
    throw new Error('Access denied: Not an admin or authorized user');
  }

  return {
    uid: user.uid,
    email: user.email,
    name: userData.name,
    role: userData.role,
  };
}
