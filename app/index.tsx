import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import { LogBox } from 'react-native';

const Index = () => {

  LogBox.ignoreAllLogs(true); // Hides all warnings and errors
  
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