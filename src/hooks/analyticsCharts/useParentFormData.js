import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const useParentFormData = () => {
  const [parentData, setParentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Parent_Form'));
        const list = snapshot.docs.map((doc) => doc.data());
        setParentData(list);
      } catch (error) {
        console.error('Error fetching Parent_Form data:', error);
      }
    };

    fetchData();
  }, []);

  return parentData;
};

export default useParentFormData;
