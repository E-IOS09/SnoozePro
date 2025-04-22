import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SleepTimePickerProps } from "@/types";

const SleepTimePicker: React.FC<SleepTimePickerProps> = ({ value, onChange }) => {
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

  const showPicker = (mode: "date" | "time") => {
    setPickerMode(mode);
  };

  const handleChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);

      if (Platform.OS === "android") {
        if (pickerMode === "date") {
          setTimeout(() => setPickerMode("time"), 200);
        } else {
          setPickerMode(null);
        }
      }
    } else {
      setPickerMode(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>When did you sleep?</Text>
      <View style={styles.row}>
        <Pressable style={styles.box} onPress={() => showPicker("date")}>
          <Text style={styles.boxText}>
            {value.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </Pressable>
        <Pressable style={styles.box} onPress={() => showPicker("time")}>
          <Text style={styles.boxText}>
            {value.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>
      </View>

      {pickerMode && (
        <DateTimePicker
          value={value}
          mode={pickerMode}
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
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    color: "#000",
    fontSize: 22,
    fontWeight: "600",
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
});
