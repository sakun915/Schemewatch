// src/hooks/useCurrentUser.js
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const useCurrentUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'Users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const profile = userDocSnap.data();
            setUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: profile.role,
              isAdmin: profile.role === 'admin',
              isResearchOfficer: profile.role === 'Research Officer',
            }); 
          } else {
            console.warn('No Firestore profile found for UID:', firebaseUser.uid);
            setUserData(null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user: userData, loading };
};

export default useCurrentUser;
