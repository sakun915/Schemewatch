// src/hooks/useUserActivityStatus.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const useUserActivityStatus = () => {
  const [counts, setCounts] = useState({ active: 0, inactive: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const activeSnapshot = await getDocs(collection(db, "activeUsers"));
        const inactiveSnapshot = await getDocs(collection(db, "inactiveUsers"));

        setCounts({
          active: activeSnapshot.size,
          inactive: inactiveSnapshot.size,
        });
      } catch (error) {
        console.error("Error fetching user activity data:", error);
      }
    };

    fetchCounts();
  }, []);

  return counts;
};

export default useUserActivityStatus;
