import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "Users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      if (userData.role === "admin") {
        return {
          success: true,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: userData.role,
          },
        };
      } else {
        throw new Error("Access denied: not an admin.");
      }
    } else {
      throw new Error("Access denied: user not found.");
    }
  } catch (error) {
    console.error("Sign-in failed:", error.message);
    return { success: false, error: error.message };
  }
};
