// contexts/SleepContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";

// Define the type for a sleep entry
type SleepEntry = {
  id: string; // Firestore document ID (usually the date string)
  moodValue: string;
  sleepDateTime: string;
};

// Define the shape of the context
interface SleepContextType {
  sleepEntries: SleepEntry[];
  addSleepData: (
    entry: Omit<SleepEntry, "id">,
    dateKey: string
  ) => Promise<void>;
  getAllSleepData: () => Promise<void>;
}

const SleepContext = createContext<SleepContextType | undefined>(undefined);

export const SleepProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);

  // Save sleep log to Firestore
  const addSleepData = async (
    entry: Omit<SleepEntry, "id">,
    dateKey: string
  ) => {
    if (!user?.uid) {
      console.warn("User not logged in");
      return;
    }
    try {
      const ref = doc(firestore, "users", user.uid, "sleepData", dateKey);
      await setDoc(ref, entry);
      console.log("Sleep entry saved to Firestore");
    } catch (error) {
      console.error("Error saving sleep data:", error);
    }
  };

  // Fetch all sleep logs from Firestore
  const getAllSleepData = async () => {
    if (!user?.uid) {
      console.warn("User not logged in");
      return;
    }
    try {
      const colRef = collection(firestore, "users", user.uid, "sleepData");
      const querySnapshot = await getDocs(colRef);
      const data: SleepEntry[] = [];

      querySnapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        data.push({
          id: docSnap.id,
          moodValue: docData.moodValue,
          sleepDateTime: docData.sleepDateTime,
        });
      });

      setSleepEntries(data);
    } catch (error) {
      console.error("Error fetching sleep data:", error);
    }
  };

  return (
    <SleepContext.Provider value={{ sleepEntries, addSleepData, getAllSleepData }}>
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
