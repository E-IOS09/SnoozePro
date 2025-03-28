import React, { createContext, ReactNode, useContext, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";

interface SleepData {
  id: string;
  moodValue: string;
  ratings: number;
  sleepDateTime: string;
  wakeDateTime: string;
}

interface SleepContextType {
  sleepLogs: SleepData[];
  addSleepData: (
    dateString: string,
    moodValue: string,
    ratings: number,
    sleepDate: Date,
    wakeDate: Date
  ) => Promise<void>;
  getAllSleepData: () => Promise<void>;
}

const SleepContext = createContext<SleepContextType | null>(null);

export const SleepProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [sleepLogs, setSleepLogs] = useState<SleepData[]>([]);

  const addSleepData = async (
    dateString: string,
    moodValue: string,
    ratings: number,
    sleepDate: Date,
    wakeDate: Date
  ) => {
    if (!user?.uid) {
      console.error("No user is logged in. Cannot add sleep data.");
      return;
    }
    try {
      await setDoc(
        doc(firestore, "users", user.uid, "sleepData", dateString),
        {
          moodValue,
          ratings,
          sleepDateTime: sleepDate.toISOString(),
          wakeDateTime: wakeDate.toISOString(),
        }
      );
      console.log("Sleep data added/updated successfully");
    } catch (error) {
      console.error("Error adding sleep data:", error);
    }
  };

  const getAllSleepData = async () => {
    if (!user?.uid) {
      console.error("No user is logged in. Cannot fetch sleep data.");
      return;
    }
    try {
      const colRef = collection(firestore, "users", user.uid, "sleepData");
      const querySnap = await getDocs(colRef);
      const allData: SleepData[] = [];
      querySnap.forEach((docSnap) => {
        const docData = docSnap.data();
        allData.push({
          id: docSnap.id,
          moodValue: docData.moodValue,
          ratings: docData.ratings,
          sleepDateTime: docData.sleepDateTime,
          wakeDateTime: docData.wakeDateTime,
        });
      });
      setSleepLogs(allData);
    } catch (error) {
      console.error("Error fetching sleep data:", error);
    }
  };

  return (
    <SleepContext.Provider value={{ sleepLogs, addSleepData, getAllSleepData }}>
      {children}
    </SleepContext.Provider>
  );
};

export const useSleep = (): SleepContextType => {
  const context = useContext(SleepContext);
  if (!context) {
    throw new Error("useSleep must be used within a SleepProvider");
  }
  return context;
};
