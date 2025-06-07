import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useStudentGenderCount = () => {
  const [data, setData] = useState({ boys: 0, girls: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "School_Form"));
      let boys = 0, girls = 0;

      snapshot.forEach(doc => {
        const d = doc.data();
        boys += Number(d.totalBoys || 0);
        girls += Number(d.totalGirls || 0);
      });

      setData({ boys, girls });
    };

    fetchData();
  }, []);

  return data;
};

export default useStudentGenderCount;
