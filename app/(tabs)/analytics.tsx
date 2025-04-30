import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSleep } from "@/contexts/SleepContext";
import { colors, spacingX, spacingY } from "@/constants/theme";

const Analytics = () => {
  const { sleepEntries } = useSleep();
  const sortedEntries = [...sleepEntries].sort((a, b) => a.id.localeCompare(b.id));
  const last7 = sortedEntries.slice(-7);

  const labels = last7.map((e) => {
    const d = e.sleepDateTime ? new Date(e.sleepDateTime) : new Date();
    return `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
  });

  const sleepHours = last7.map((e) => e.sleepDurationHours);

  const averageSleep =
    sleepHours.length > 0
      ? (sleepHours.reduce((a, b) => a + b, 0) / sleepHours.length).toFixed(1)
      : "0";

  const chartWidth = Dimensions.get("window").width - 60;

  const chartConfig = {
    backgroundColor: "#2e2e2e",
    backgroundGradientFrom: "#2e2e2e",
    backgroundGradientTo: "#2e2e2e",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#ffffff",
    },
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>📊 Sleep Analytics</Text>

        {/* Average Sleep styled like Log Sleep button */}
        <View style={styles.averageSleepButton}>
          <Text style={styles.averageSleepText}>
            😴 Avg Sleep: <Text style={styles.bold}>{averageSleep} hrs</Text>
          </Text>
        </View>

        {/* Chart inside dark journal-style card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>🛏️ Total Sleep Duration (last 7 days)</Text>
          <LineChart
            data={{
              labels,
              datasets: [{ data: sleepHours }],
            }}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: spacingY._15,
  },
  averageSleepButton: {
    backgroundColor: "#bfa2f7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: spacingY._20,
  },
  averageSleepText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  card: {
    backgroundColor: "#2e2e2e",
    padding: 16,
    borderRadius: 16,
    marginBottom: spacingY._20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: spacingY._10,
    fontWeight: "500",
  },
  chart: {
    borderRadius: 16,
  },
});
