// src/hooks/analyticsCharts/useSchoolGrantDataByUdise.js
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useSchoolGrantDataByUdise = (udiseNo) => {
  const [grantData, setGrantData] = useState(null);

  useEffect(() => {
    if (!udiseNo) return;

    const fetchData = async () => {
      const q = query(collection(db, "School_Form"), where("udiseNumber", "==", String(udiseNo)));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        console.log(docData);
      setGrantData({
  "2022-23": {
    received: docData.grantReceived?.["2022-23"] || 0,
    spent: docData.grantExpenditure?.["2022-23"] || 0,
    balance: docData.grantBalance?.["2022-23"] || 0
  },
  "2023-24": {
    received: docData.grantReceived?.["2023-24"] || 0,
    spent: docData.grantExpenditure?.["2023-24"] || 0,
    balance: docData.grantBalance?.["2023-24"] || 0
  },
  "2024-25": {
    received: docData.grantReceived?.["2024-25"] || 0,
    spent: docData.grantExpenditure?.["2024-25"] || 0,
    balance: docData.grantBalance?.["2024-25"] || 0
  }
});

        
      }
    };

    fetchData();
  }, [udiseNo]);

  return grantData;
};

export default useSchoolGrantDataByUdise;
