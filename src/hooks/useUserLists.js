import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config"; // your firebase config

const useUserLists = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const activeSnapshot = await getDocs(collection(db, "activeUsers"));
        const inactiveSnapshot = await getDocs(collection(db, "inactiveUsers"));

        const active = activeSnapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    fullName: `${data.firstName} ${data.lastName}`,
    role: data.role || "N/A",
  };
});

const inactive = inactiveSnapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    fullName: `${data.firstName} ${data.lastName}`,
    role: data.role || "N/A",
    lastActive: data.lastActive?.toDate().toLocaleString(),
  };
});


        setActiveUsers(active);
        setInactiveUsers(inactive);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return { activeUsers, inactiveUsers };
};

export default useUserLists;
