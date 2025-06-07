import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const useTeacherGenderCount = () => {
  const [data, setData] = useState({ male: 0, female: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "School_Form"));
      let male = 0, female = 0;

      snapshot.forEach(doc => {
        const d = doc.data();
        male += Number(d.teacherMale || 0);
        female += Number(d.teacherFemale || 0);
      });

      setData({ male, female });
    };

    fetchData();
  }, []);

  return data;
};

export default useTeacherGenderCount;
