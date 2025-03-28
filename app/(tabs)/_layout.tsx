// app/_layout.tsx
import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { CustomTabs } from "@/components/CustomTabs";

const Layout = () => {
  return (
    <Tabs tabBar={(props) => <CustomTabs {...props} />} screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{title: "Home"}} />
      <Tabs.Screen name="stat" options={{title: "Statistics"}} />
      <Tabs.Screen name="profile" options={{title: "Profile"}} />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});

