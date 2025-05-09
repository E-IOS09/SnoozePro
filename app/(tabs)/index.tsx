import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { useAuth } from "@/contexts/authContext";
import { colors, spacingX } from "@/constants/theme";
import { UserCircle, Plus } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import LogSleepModal from "@/components/LogSleepModal";
import ViewPreferencesModal from "@/components/ViewPreferencesModal"; // ✅ import the new modal

const Home = () => {
  const { user } = useAuth();
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [preferencesVisible, setPreferencesVisible] = useState(false); // ✅ state for preferences modal
  const navigation = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const firstName = user?.name?.split(" ")[0] || "Guest";

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <UserCircle size={40} color={colors.neutral100} weight="light" />
          <View style={styles.textGroup}>
            <Text style={styles.greetingText}>{getGreeting()},</Text>
            <Text style={styles.nameText}>{firstName}</Text>
          </View>
          <Pressable
            style={styles.plusButton}
            onPress={() => setPreferencesVisible(true)} // ✅ open modal on press
          >
            <Plus size={20} color={colors.black} weight="bold" />
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Sleep Image */}
        <Image
          source={require("@/assets/images/sleeping.png")}
          style={styles.sleepImage}
          resizeMode="contain"
        />

        {/* Time & Date */}
        <View style={styles.dateTimeContainer}>
          <Text style={styles.timeText}>
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Log Sleep Button */}
        <View style={styles.logSleepContainer}>
          <Pressable
            style={styles.logSleepButton}
            onPress={() => setLogModalVisible(true)}
          >
            <Image
              source={require("@/assets/images/sunny.png")}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
            <Text style={styles.logSleepButtonText}>Log Sleep</Text>
            <Image
              source={require("@/assets/images/night.png")}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* View Journal Button */}
        <View style={styles.viewJournalContainer}>
          <Pressable
            style={styles.viewJournalButton}
            onPress={() => navigation.navigate("journal")}
          >
            <Text style={styles.viewJournalButtonText}>View Journal</Text>
            <Image
              source={require("@/assets/images/journal.png")}
              style={styles.buttonIconRight}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* Modals */}
        <LogSleepModal
          visible={logModalVisible}
          onClose={() => setLogModalVisible(false)}
        />

        <ViewPreferencesModal
          visible={preferencesVisible}
          onClose={() => setPreferencesVisible(false)} // ✅ close handler
        />
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: spacingX._20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textGroup: {
    flex: 1,
    marginLeft: 12,
  },
  greetingText: {
    color: "#f2f2f2",
    fontSize: 14,
  },
  nameText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  plusButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  divider: {
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  sleepImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
    alignSelf: "center",
  },
  dateTimeContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  timeText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    color: "#f2f2f2",
  },
  logSleepContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  logSleepButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  logSleepButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  viewJournalContainer: {
    alignItems: "center",
  },
  viewJournalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f2f3b",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  viewJournalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIconRight: {
    width: 28,
    height: 28,
    marginLeft: 10,
  },
});
