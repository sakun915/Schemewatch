import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const FACILITY_KEYS = [
  "hasCctv",
  "hasDiningHall",
  "hasGrainSafety",
  "hasHandwashSoap",
  "hasKitchen",
  "hasSeparateToilets",
  "hasStorageRoom",
  "hasUtensils"
];

const useBasicFacilitiesData = () => {
  const [facilityCounts, setFacilityCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "School_Form"));
      const counts = {};

      FACILITY_KEYS.forEach(key => (counts[key] = 0));

      snapshot.forEach(doc => {
        const data = doc.data();
        const basicFacilities = data.basicFacilities || {};

        FACILITY_KEYS.forEach(key => {
          if (basicFacilities[key] === 1 || basicFacilities[key] === "1") {
            counts[key]++;
          }
        });
      });

      setFacilityCounts(counts);
    };

    fetchData();
  }, []);

  return facilityCounts;
};

export default useBasicFacilitiesData;
