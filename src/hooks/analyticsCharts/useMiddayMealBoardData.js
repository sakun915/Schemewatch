import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useMiddayMealBoardData = () => {
  const [data, setData] = useState({ yes: 0, no: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "School_Form"));
      let yes = 0, no = 0;

      snapshot.forEach(doc => {
        const val = doc.data().hasMiddayMealBoard;
        if (val === 1) yes++;
        else no++;
      });

      setData({ yes, no });
    };

    fetchData();
  }, []);

  return data;
};

export default useMiddayMealBoardData;
