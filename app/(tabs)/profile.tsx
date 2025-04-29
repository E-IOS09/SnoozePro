import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { UserCircle } from "phosphor-react-native";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { signOut } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Profile = () => {
  const { user } = useAuth();
  const [streakCount, setStreakCount] = useState<number>(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user?.uid) return;

      const ref = doc(firestore, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setStreakCount(data.streakCount || 0);
        setBadges(data.badges || []);
      }
    };

    fetchUserStats();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const badgeIconMap: Record<string, keyof typeof FontAwesome.glyphMap> = {
    "Good Start!": "smile-o",
    "Streak Master": "trophy",
    // Add more badges here
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

          <Text style={styles.streakText}>🔥 Sleep Streak: {streakCount} Day{streakCount !== 1 ? "s" : ""}</Text>

          {badges.length > 0 && (
            <View style={styles.badgesContainer}>
              <Text style={styles.badgesLabel}>🏅 Badges:</Text>
              <View style={styles.badgeIcons}>
                {badges.map((badge, index) => (
                  <View key={index} style={styles.badgeItem}>
                    <FontAwesome
                      name={badgeIconMap[badge] || "question"}
                      size={24}
                      color="#FFD700"
                    />
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

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
  streakText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFDD00",
  },
  badgesContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  badgesLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  badgeIcons: {
    flexDirection: "row",
    marginTop: 5,
    gap: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badgeItem: {
    alignItems: "center",
  },
  badgeText: {
    color: "#FFD700",
    fontSize: 12,
    marginTop: 4,
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
