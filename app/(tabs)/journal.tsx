import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import { useSleep } from "@/contexts/SleepContext";

const Journal = () => {
  const { sleepEntries, getAllSleepData } = useSleep();

  useEffect(() => {
    getAllSleepData(); // 🔥 Fetch data from Firebase
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Your Sleep Journal</Text>

          {sleepEntries.length === 0 ? (
            <Text style={styles.emptyText}>No sleep data yet</Text>
          ) : (
            <FlatList
              data={sleepEntries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.entry}>
                  <Text style={styles.entryText}>
                    💤{new Date(item.sleepDateTime).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
})} at {new Date(item.sleepDateTime).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}

                    | Mood: {item.moodValue}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    textTransform: "uppercase",
    textAlign: "center",
  },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  entry: {
    backgroundColor: "#2f2f3b",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  entryText: {
    color: "#fff",
    fontSize: 16,
  },
});
