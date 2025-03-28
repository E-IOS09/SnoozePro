import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
import { SleepProvider } from "@/contexts/SleepContext";
import { Slot } from "expo-router";

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <SleepProvider>
      <StackLayout />
      </SleepProvider>
      
    </AuthProvider>
  )
};

const styles = StyleSheet.create({});