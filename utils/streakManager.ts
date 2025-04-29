// utils/streakManager.ts
import { firestore } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

// Update user's sleep streak and badges
export async function updateStreakAndBadges(uid: string, newSleepDate: string) {
  const streakRef = doc(firestore, "users", uid, "streak", "streakInfo");
  const lastLoggedRef = doc(firestore, "users", uid, "streak", "lastLogged");
  const badgeRef = doc(firestore, "users", uid, "streak", "badges");


  // Get previous streak data
  const [streakSnap, lastLoggedSnap] = await Promise.all([
    getDoc(streakRef),
    getDoc(lastLoggedRef),
  ]);

  let currentStreak = streakSnap.exists() ? streakSnap.data().streakCount || 0 : 0;
  let lastDate = lastLoggedSnap.exists() ? lastLoggedSnap.data().lastLoggedDate : null;

  const newDate = new Date(newSleepDate);
  const yesterday = new Date(newDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let updatedStreak = 1;

  if (lastDate === yesterdayStr) {
    updatedStreak = currentStreak + 1;
  }

  const badgeData: any = {};
if (updatedStreak >= 3) badgeData.goodStart = true;
if (updatedStreak >= 7) badgeData.streakMaster = true;

  // Save new streak count
  await setDoc(streakRef, { streakCount: updatedStreak });
  await setDoc(lastLoggedRef, { lastLoggedDate: newSleepDate });
  await setDoc(badgeRef, badgeData, { merge: true });

  // Optional: Badge logic
  if (updatedStreak === 3) {
    Alert.alert("🎉 Badge Unlocked", "Good Start! 🥳 You've logged sleep 3 days in a row!");
  } else if (updatedStreak === 7) {
    Alert.alert("🏆 Badge Unlocked", "Streak Master! 🏆 You've reached a 7-day streak!");
  }

  return updatedStreak;
}
