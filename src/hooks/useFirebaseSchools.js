// src/hooks/useFirebaseSchools.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import useCurrentUser from './useCurrentUser';

const useFirebaseSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: userLoading } = useCurrentUser();

  const canAccessSchoolForm = user && (user.isAdmin || user.isResearchOfficer);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user || !canAccessSchoolForm) {
        throw new Error('Unauthorized access');
      }

      const querySnapshot = await getDocs(collection(db, 'School_Form'));
      const schoolsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        udiseNumber: doc.data().udiseNumber || doc.data().UDISE || 'N/A',
        lastUpdated: doc.data().timestamp?.toDate()?.toISOString() || 'Unknown',
      }));

      setSchools(schoolsData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading) {
      fetchSchools();
    }
  }, [userLoading, user]);

  const refreshSchools = fetchSchools;

  return { 
    schools, 
    loading: loading || userLoading, 
    error, 
    refreshSchools 
  };
};

export default useFirebaseSchools;
