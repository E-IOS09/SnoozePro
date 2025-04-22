import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ViewPreferencesModal: React.FC<Props> = ({ visible, onClose }) => {
  const { user } = useAuth();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Your Sleep Preferences</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Wake Time:</Text>
            <Text style={styles.value}>
              {user?.preferredWakeTime
                ? new Date(user.preferredWakeTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Not set"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Sleep Time:</Text>
            <Text style={styles.value}>
              {user?.preferredSleepTime
                ? new Date(user.preferredSleepTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Not set"}
            </Text>
          </View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ViewPreferencesModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modal: {
    backgroundColor: "#1f1f2e",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 340,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    color: colors.textLight,
    fontSize: 16,
  },
  value: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.purple,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
