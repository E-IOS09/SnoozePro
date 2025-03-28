import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const Stat = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Main content area on top of the background */}
        <View style={styles.content}>
          <Text style={styles.title}>Your Journal / Stats</Text>
          {/* Add your journal or stats UI here */}
          <Text style={styles.paragraph}>
            This is where you can display your sleep stats, journal entries, or any
            other information you want to show.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Stat;

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
    // Optionally center items or adjust layout:
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
});
