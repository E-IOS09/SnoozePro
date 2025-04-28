import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { firestore } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { colors, spacingX } from "@/constants/theme";
import BackButton from "@/components/BackButton";


const SleepScreen = () => {
  const [sleepTime, setSleepTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();
  const { user , updateUserData} = useAuth();
  const { wakeTime } = useLocalSearchParams();

  const handleSave = async () => {
    if (!user?.uid || !wakeTime) return;

    try {
      const ref = doc(firestore, "users", user.uid);
      await updateDoc(ref, {
        preferredWakeTime: wakeTime,
        preferredSleepTime: sleepTime.toISOString(),
        onboardingComplete: true,
      });

      await updateUserData(user.uid); // ✅ Refresh user context after saving

      Alert.alert("Success", "Your preferences are saved 💤");
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Error saving preferences:", err);
      Alert.alert("Error", "Failed to save preferences");
    }
  };

  const handleChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && date) {
        setSleepTime(date);
      }
    } else {
      if (date) setSleepTime(date);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <BackButton style={{ marginBottom: 10, alignSelf: "flex-start" }} />

        <Text style={styles.title}>When do you usually go to sleep?</Text>

        <Pressable style={styles.timeButton} onPress={() => setShowPicker((prev) => !prev)}>
          <Text style={styles.timeText}>
            {sleepTime.toLocaleTimeString("en-UK", { hour: "numeric", minute: "2-digit", hour12: true, })}
          </Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={sleepTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
            themeVariant={Platform.OS === "ios" ? "dark" : "light"}
          />
        )}

        <Pressable style={styles.nextButton} onPress={handleSave}>
          <Text style={styles.nextButtonText}>Save & Continue</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};



export default SleepScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  timeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  timeText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: colors.purple,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
