import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import DatePicker from "react-native-date-picker";

const SleepTimePicker = () => {
  const [sleepDate, setSleepDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>When did you sleep?</Text>

      <View style={styles.row}>
        {/* Date button */}
        <Pressable
          style={styles.box}
          onPress={() => {
            setPickerMode("date");
            setShowDatePicker(true);
          }}
        >
          <Text style={styles.boxText}>
            {sleepDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </Text>
        </Pressable>

        {/* Time button */}
        <Pressable
          style={styles.box}
          onPress={() => {
            setPickerMode("time");
            setShowDatePicker(true);
          }}
        >
          <Text style={styles.boxText}>
            {sleepDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>
      </View>

      {/* Picker modal */}
      <Modal transparent visible={showDatePicker} animationType="slide">
        <View style={styles.modalContainer}>
          <DatePicker
            date={sleepDate}
            mode={pickerMode}
            onDateChange={setSleepDate}
            textColor="#fff"
          />
          <View style={styles.modalButtons}>
            <Pressable onPress={() => setShowDatePicker(false)}>
              <Text style={styles.cancel}>CANCEL</Text>
            </Pressable>
            <Pressable onPress={() => setShowDatePicker(false)}>
              <Text style={styles.confirm}>CONFIRM</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SleepTimePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Snell Roundhand", // Optional: match the fancy font you showed
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  box: {
    backgroundColor: "#3d3d3d",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  boxText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  cancel: {
    color: "#bbb",
    fontSize: 18,
  },
  confirm: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
