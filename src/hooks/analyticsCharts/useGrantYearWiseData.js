import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useGrantYearWiseData = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "School_Form"));
      const years = ["2022-23", "2023-24", "2024-25"];
      const received = { "2022-23": 0, "2023-24": 0, "2024-25": 0 };
      const spent = { "2022-23": 0, "2023-24": 0, "2024-25": 0 };
      const balance = { "2022-23": 0, "2023-24": 0, "2024-25": 0 };

      snapshot.forEach(doc => {
        const data = doc.data();
        years.forEach(year => {
          received[year] += data.grantReceived?.[year] || 0;
          spent[year] += data.grantExpenditure?.[year] || 0;
          balance[year] += data.grantBalance?.[year] || 0;
        });
      });

      setChartData({
        labels: years,
        datasets: [
          {
            label: "Expenditure",
            data: years.map(y => spent[y]),
            backgroundColor: "#FF6384",
          },
          {
            label: "Balance",
            data: years.map(y => balance[y]),
            backgroundColor: "#36A2EB",
          },
        ],
      });
    };

    fetchData();
  }, []);

  return chartData;
};

export default useGrantYearWiseData;
