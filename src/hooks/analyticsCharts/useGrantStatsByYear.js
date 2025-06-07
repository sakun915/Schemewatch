import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useGrantStatsByYear = () => {
  const [stats, setStats] = useState({
    2022: { received: 0, spent: 0, balance: 0 },
    2023: { received: 0, spent: 0, balance: 0 },
    2024: { received: 0, spent: 0, balance: 0 },
    2025: { received: 0, spent: 0, balance: 0 }
  });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "School_Form"));
      const data = {
        2022: { received: 0, spent: 0, balance: 0 },
        2023: { received: 0, spent: 0, balance: 0 },
        2024: { received: 0, spent: 0, balance: 0 },
        2025: { received: 0, spent: 0, balance: 0 }
      };

      snapshot.forEach(doc => {
        const d = doc.data();
        for (let year of [2022, 2023, 2024, 2025]) {
          data[year].received += Number(d[`grantReceived${year}`]) || 0;
          data[year].spent += Number(d[`grantExpenditure${year}`]) || 0;
          data[year].balance += Number(d[`grantBalance${year}`]) || 0;
        }
      });

      setStats(data);
    };

    fetchData();
  }, []);

  return stats;
};

export default useGrantStatsByYear;
