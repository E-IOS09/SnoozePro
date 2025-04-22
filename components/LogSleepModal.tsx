// LogSleepModal.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import SleepTimePicker from "@/components/SleepTimePicker";
import BackButton from "@/components/BackButton";
import MoodPicker from "@/components/MoodPicker";
import { useSleep } from "@/contexts/SleepContext"; // ✅ Firebase context

type LogSleepModalProps = {
  visible: boolean;
  onClose: () => void;
};

const LogSleepModal = ({ visible, onClose }: LogSleepModalProps) => {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;

  const centerImage = isNight
    ? require("@/assets/images/night.png")
    : require("@/assets/images/sunny.png");

  const sideImageLeft = centerImage;
  const sideImageRight = centerImage;

  const [sleepDate, setSleepDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState("Great");

  const { addSleepData } = useSleep();

  const handleSave = async () => {
    const entry = {
      moodValue: selectedMood,
      sleepDateTime: sleepDate.toISOString(),
    };
    const dateKey = sleepDate.toISOString().split("T")[0];
    await addSleepData(entry, dateKey);
    Alert.alert("Success", "Sleep log saved to Firebase 🔥");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <Image source={sideImageLeft} style={styles.sideImageLeft} resizeMode="contain" />
        <Image source={sideImageRight} style={styles.sideImageRight} resizeMode="contain" />

        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Log Your Sleep</Text>
            <View style={styles.backWrapper}>
              <BackButton onPress={onClose} iconSize={20} />
            </View>
          </View>

          <Image source={centerImage} style={styles.centerImage} resizeMode="contain" />

          <SleepTimePicker value={sleepDate} onChange={setSleepDate} />

          <MoodPicker selectedMood={selectedMood} onSelect={setSelectedMood} />

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogSleepModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backWrapper: {
    padding: 5,
  },
  centerImage: {
    width: "100%",
    height: 150,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  closeButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  sideImageLeft: {
    position: "absolute",
    top: "10%",
    left: 0,
    width: 50,
    height: 150,
    opacity: 0.7,
  },
  sideImageRight: {
    position: "absolute",
    top: "10%",
    right: 0,
    width: 50,
    height: 150,
    opacity: 0.7,
  },
});
