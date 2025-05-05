import * as Notifications from "expo-notifications";

// Request permission
export async function requestNotificationPermission() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === "granted";
  }
  return true;
}

// Schedule reminders from preferred sleep/wake times
export async function scheduleSleepReminderFromPrefs(sleepTime: string, wakeTime: string) {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  const [sleepHour, sleepMin] = sleepTime.split(":").map(Number);
  const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);

  // Adjust sleep: 30 min before
  let bedtimeHour = sleepHour;
  let bedtimeMin = sleepMin - 30;
  if (bedtimeMin < 0) {
    bedtimeHour = (bedtimeHour - 1 + 24) % 24;
    bedtimeMin += 60;
  }

  // Adjust wake: 30 min after
  let morningHour = wakeHour;
  let morningMin = wakeMin + 30;
  if (morningMin >= 60) {
    morningHour = (morningHour + 1) % 24;
    morningMin -= 60;
  }

  // Schedule bedtime
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Bedtime Reminder",
      body: "Don't forget to log your sleep 😴",
    },
    trigger: {
      hour: bedtimeHour,
      minute: bedtimeMin,
      repeats: true,
      type: "daily",
    },
  });

  // Schedule morning
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🌞 Morning Check-in",
      body: "How did you sleep? Log it now 📝",
    },
    trigger: {
      hour: morningHour,
      minute: morningMin,
      repeats: true,
      type: "daily",
    },
  });
}

// Send test notification
export async function sendTestNotification() {
  const granted = await requestNotificationPermission();
  if (!granted) {
    alert("Permission not granted");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📣 Test Notification",
      body: "This is a test to check if notifications work!",
    },
    trigger: {
      seconds: 5,
      repeats: false,
      type: "timeInterval",
    },
  });

  console.log("✅ Test notification scheduled");
}
