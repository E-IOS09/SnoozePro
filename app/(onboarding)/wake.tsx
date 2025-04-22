import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { colors, spacingX } from "@/constants/theme";
import BackButton from "@/components/BackButton";

const WakeScreen = () => {
  const [wakeTime, setWakeTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const handleChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && date) {
        setWakeTime(date);
      }
      setShowPicker(false);
    } else {
      if (date) setWakeTime(date);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <BackButton iconSize={28} style={{ marginBottom: 20 }} />

        <Text style={styles.title}>When do you usually wake up?</Text>

        <Pressable style={styles.timeButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.timeText}>
            {wakeTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={wakeTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
          />
        )}

        <Pressable
          style={styles.nextButton}
          onPress={() =>
            router.push({
              pathname: "/(onboarding)/sleep",
              params: { wakeTime: wakeTime.toISOString() },
            })
          }
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default WakeScreen;

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
