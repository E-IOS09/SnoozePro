import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { CustomTabs } from "@/components/CustomTabs";
import { SleepProvider } from "@/contexts/SleepContext";

const Layout = () => {
  return (
    <Tabs tabBar={(props) => <CustomTabs {...props} />} screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="journal" options={{ title: "Journal" }} />
      <Tabs.Screen name="analytics" options={{ title: "Analytics" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});

