// src/hooks/useUserRoles.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const useUserRoles = () => {
  const [rolesCount, setRolesCount] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "Users");
        const snapshot = await getDocs(usersCollection);

        const roleCounts = {};

        snapshot.forEach((doc) => {
          const role = doc.data().role || "Unknown";
          roleCounts[role] = (roleCounts[role] || 0) + 1;
        });

        setRolesCount(roleCounts);
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUsers();
  }, []);

  return rolesCount;
};

export default useUserRoles;
