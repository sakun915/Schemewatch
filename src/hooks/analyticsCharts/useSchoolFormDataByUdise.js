// src/hooks/analyticsCharts/useSchoolFormDataByUdise.js
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useSchoolFormDataByUdise = (udiseNo) => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!udiseNo) return;
    

    const fetchSchoolData = async () => {
      try {
        const q = query(
          collection(db, "School_Form"),
          where("udiseNumber", "==", String(udiseNo))
          
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
           
          setSchoolData(querySnapshot.docs[0].data());
        } else {
          setSchoolData(null);
        }
      } catch (error) {
        console.error("Error fetching school data by UDISE:", error);
        setSchoolData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [udiseNo]);

  return { schoolData, loading };
};

export default useSchoolFormDataByUdise;
