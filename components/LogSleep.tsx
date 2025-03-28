import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import Button from "@/components/Button";
import SleepTimePicker from "@/components/SleepTimePicker";

type LogSleepModalProps = {
  visible: boolean;
  onClose: () => void;
};

const LogSleepModal = ({ visible, onClose }: LogSleepModalProps) => {
  // Choose a center image based on the current hour
  const hour = new Date().getHours();
  const centerImage =
    hour < 18
      ? require("@/assets/images/sunny.png")
      : require("@/assets/images/night.png");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {/* Left side decorative image */}
        <Image
          source={require("@/assets/images/night.png")}
          style={styles.sideImageLeft}
          resizeMode="contain"
        />
        {/* Right side decorative image */}
        <Image
          source={require("@/assets/images/sunny.png")}
          style={styles.sideImageRight}
          resizeMode="contain"
        />
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Log Your Sleep</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          <Image
            source={centerImage}
            style={styles.centerImage}
            resizeMode="contain"
          />
          {/* Sleep logging UI */}
          <SleepTimePicker />
          <Button style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    // Ensure relative positioning for the absolute images
    position: "relative",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // To avoid overlapping the side images, add some horizontal padding if needed
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
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "600",
  },
  centerImage: {
    width: "100%",
    height: 150,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
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

export default LogSleepModal;
