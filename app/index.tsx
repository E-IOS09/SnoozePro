import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/(auth)/welcome");
  //   }, 2000);
  // }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("/Users/eshitamangal/SnoozePro/assets/images/logo.png")}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});