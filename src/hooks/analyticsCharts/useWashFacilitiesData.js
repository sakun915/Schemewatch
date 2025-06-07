import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useWashFacilitiesData = () => {
  const [data, setData] = useState({ withSoap: 0, withoutSoap: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "School_Form"));
      let withSoap = 0, withoutSoap = 0;

      snapshot.forEach(doc => {
        const record = doc.data();
        if (record.hasHandwashSoap === 1 || record.hasHandwashSoap === "1") {
          withSoap++;
        } else {
          withoutSoap++;
        }
      });

      setData({ withSoap, withoutSoap });
    };

    fetchData();
  }, []);

  return data;
};

export default useWashFacilitiesData;
