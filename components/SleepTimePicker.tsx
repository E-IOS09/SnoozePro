import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type SleepTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  label: string; // ✅ new
};

const SleepTimePicker = ({ value, onChange, label }: SleepTimePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <Pressable
          style={styles.dateButton}
          onPress={() => setShowPicker((prev) => !prev)}
        >
          <Text style={styles.dateText}>
            {value.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </Pressable>

        <Pressable
          style={styles.dateButton}
          onPress={() => setShowPicker((prev) => !prev)}
        >
          <Text style={styles.dateText}>
            {value.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </Pressable>
      </View>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default SleepTimePicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  dateButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 110,
    alignItems: "center",
  },
  dateText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});