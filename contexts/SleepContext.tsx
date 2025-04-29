import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";

// Define type for each sleep entry
export type SleepEntry = {
  sleepDurationHours: number;
  moodValue: string;
  sleepDateTime: string;
  wakeDateTime?: string;
  id: string;
};

// Define context type
interface SleepContextType {
  sleepEntries: SleepEntry[];
  streakCount: number;
  badge: string;
  addSleepData: (entry: Omit<SleepEntry, "id">, dateKey: string) => Promise<void>;
  getAllSleepData: () => Promise<void>;
}

const SleepContext = createContext<SleepContextType | undefined>(undefined);

export const SleepProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUserData } = useAuth();
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [badge, setBadge] = useState<string>("");

  useEffect(() => {
    if (user?.uid) getAllSleepData();
  }, [user?.uid]);

  const calculateStreak = async (newDateKey: string) => {
    if (!user?.uid) return;

    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    let newStreak = 1;
    const lastLoggedDate = userData?.lastLoggedDate;

    if (lastLoggedDate) {
      const lastDate = new Date(lastLoggedDate);
      const currentDate = new Date(newDateKey);
      const diff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        newStreak = (userData?.streakCount || 0) + 1;
      } else if (diff === 0) {
        newStreak = userData?.streakCount || 1; // Same day, do not change
      } else {
        newStreak = 1; // Reset
      }
    }

    await setDoc(userRef, {
      ...userData,
      streakCount: newStreak,
      lastLoggedDate: newDateKey,
    }, { merge: true });

    setStreakCount(newStreak);
    updateUserData(user.uid);

    // Badge logic
    if (newStreak >= 7) {
      setBadge("Streak Master");
      console.log("🏆 Badge Unlocked: Streak Master!");
    } else if (newStreak >= 3) {
      setBadge("Good Start");
      console.log("🎉 Badge Unlocked: Good Start!");
    } else {
      setBadge("");
    }
  };

  const addSleepData = async (entry: Omit<SleepEntry, "id">, dateKey: string) => {
    if (!user?.uid) return;
    const ref = doc(firestore, "users", user.uid, "sleepData", dateKey);
    await setDoc(ref, entry);
    console.log("✅ Sleep entry added");
    await getAllSleepData();
    await calculateStreak(dateKey);
  };

  const getAllSleepData = async () => {
    if (!user?.uid) return;
    const colRef = collection(firestore, "users", user.uid, "sleepData");
    const querySnapshot = await getDocs(colRef);
    const data: SleepEntry[] = [];

    querySnapshot.forEach((docSnap) => {
      const docData = docSnap.data();
      data.push({
        id: docSnap.id,
        moodValue: docData.moodValue,
        sleepDateTime: docData.sleepDateTime,
        wakeDateTime: docData.wakeDateTime,
        sleepDurationHours: docData.sleepDurationHours,
      });
    });

    setSleepEntries(data);
  };

  return (
    <SleepContext.Provider
      value={{ sleepEntries, streakCount, badge, addSleepData, getAllSleepData }}
    >
      {children}
    </SleepContext.Provider>
  );
};

export const useSleep = () => {
  const context = useContext(SleepContext);
  if (!context) {
    throw new Error("useSleep must be used within a SleepProvider");
  }
  return context;
};
