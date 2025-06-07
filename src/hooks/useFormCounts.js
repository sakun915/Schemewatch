// src/hooks/useFormCounts.js
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config"; // ← use this instead of getFirestore(app)

const useFormCounts = () => {
  const [formCounts, setFormCounts] = useState({
    Observation_Form: 0,
    Parent_Form: 0,
    School_Form: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const observationSnap = await getDocs(collection(db, "Observation_Form"));
        const parentSnap = await getDocs(collection(db, "Parent_Form"));
        const schoolSnap = await getDocs(collection(db, "School_Form"));

        setFormCounts({
          Observation_Form: observationSnap.size,
          Parent_Form: parentSnap.size,
          School_Form: schoolSnap.size,
        });
      } catch (err) {
        console.error("Error fetching form counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return formCounts;
};

export default useFormCounts;
