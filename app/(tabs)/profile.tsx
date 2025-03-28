import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/authContext";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { UserCircle } from "phosphor-react-native";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

const Profile = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <UserCircle size={100} color={colors.neutral100} weight="light" />
            </View>
          </View>

          <Text style={styles.nameText}>{user?.name || "Your Name"}</Text>
          <Text style={styles.emailText}>{user?.email || "email@example.com"}</Text>

          <View style={styles.logoutBtn}>
            <Button onPress={handleLogout} style={styles.logoutButtonStyle}>
              <Typo size={18} color={colors.neutral900} fontWeight="600">
                Logout
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(60),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  emailText: {
    color: "#f2f2f2",
    fontSize: 16,
    fontWeight: "400",
  },
  logoutBtn: {
    marginTop: spacingY._15,
    alignSelf: "center",
    width: "60%",
  },
  logoutButtonStyle: {
    width: "100%",
    paddingVertical: 12,
  },
});
