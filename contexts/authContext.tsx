
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { AuthContextType, UserType } from "@/types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { router } from "expo-router";

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await updateUserData(firebaseUser.uid); //  Fetch full user details from Firestore

        const currentUserDoc = await getDoc(doc(firestore, "users", firebaseUser.uid));
        const currentUser = currentUserDoc.data();

        if (currentUser?.onboardingComplete) {
          router.replace("/(tabs)"); // ✅ go to home
        } else {
          router.replace("/(onboarding)/welcome"); // ⬅️ only if not completed
        }
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });
  
    return () => unsub();
  }, []);
  

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
        let msg = error.message;
        console.log("error message: " , msg );
        if (msg.includes("(auth/invalid-credential)")) msg = "Wrong credentials";
        if (msg.includes("(auth/invalid-email)")) msg = "Wrong email";
      return { success: false, msg: error.message };
    }
  };

  const register = async (email: string, password: string, name: string, dob: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", response.user.uid), {
        name,
        email,
        uid: response.user.uid,
        dob,
        onboardingComplete: false, // ✅ Always add onboarding field
      });
      return { success: true };
    } catch (error: any) {
        let msg = error.message;
        console.log("error message: " , msg );
        if (msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use ";
        if (msg.includes("(auth/invalid-email)")) msg = "Wrong email";
      return { success: false, msg: error.message };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
          onboardingComplete: data.onboardingComplete || false,
          preferredWakeTime: data.preferredWakeTime || null,   
          preferredSleepTime: data.preferredSleepTime || null,
          streakCount: data.streakCount || 0,
          badges: data.badges || [],
        };
        setUser(userData);
      }
    } catch (error: any) {
      console.log("Error updating user data:", error.message);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};