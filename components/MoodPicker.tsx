import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import {
  Smiley,
  SmileyMeh,
  MoonStars,
  SmileySad,
  WarningCircle,
} from "phosphor-react-native";
import { colors } from "@/constants/theme";
import { MoodPickerProps } from "@/types";

const moods = [
  { label: "Great", Icon: Smiley },
  { label: "Okay", Icon: SmileyMeh },
  { label: "Tired", Icon: MoonStars },
  { label: "Sad", Icon: SmileySad },
  { label: "Stressed", Icon: WarningCircle },
];

const MoodPicker: React.FC<MoodPickerProps> = ({ selectedMood, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>How did you feel?</Text>
      <View style={styles.moodRow}>
        {moods.map(({ label, Icon }) => (
          <Pressable
            key={label}
            onPress={() => onSelect(label)}
            style={[
              styles.moodButton,
              selectedMood === label && styles.selectedMood,
            ]}
          >
            <Icon
              size={30}
              color={selectedMood === label ? colors.primary : "#aaa"}
              weight="bold"
            />
            <Text style={styles.moodLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MoodPicker;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },
  moodButton: {
    alignItems: "center",
  },
  moodLabel: {
    fontSize: 12,
    marginTop: 5,
    color: "#444",
  },
  selectedMood: {
    transform: [{ scale: 1.1 }],
  },
});
