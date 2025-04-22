import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Button from "@/components/Button";
import * as Icons from "phosphor-react-native";
import { useAuth } from "@/contexts/authContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const dobRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const [dob, setDob] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !nameRef.current ||
      !dobRef.current
    ) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }

    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current,
      dobRef.current
    );
    setIsLoading(false);

    if (!res.success) {
      Alert.alert("Sign up", res.msg);
    } else {
      router.replace("/(onboarding)/welcome");
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={styles.welcomeTextContainer}>
          <Typo size={30} fontWeight="800" style={styles.welcomeText}>
            Let's,
          </Typo>
          <Typo size={30} fontWeight="800" style={styles.welcomeText}>
            Get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>
            Create an account to track your sleep
          </Typo>

          <Input
            placeholder="Enter your name"
            onChangeText={(text) => (nameRef.current = text)}
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          {/* DOB Field (as input but opens DatePicker) */}
          <Pressable onPress={() => setShowPicker((prev) => !prev)}>
  <Input
    placeholder="Enter your DOB"
    editable={false}
    pointerEvents="none"
    value={dob ? formatDate(dob) : ""}
    icon={
      <Icons.Calendar
        size={verticalScale(26)}
        color={colors.neutral300}
        weight="fill"
      />
    }
  />
</Pressable>

{showPicker && (
  <DateTimePicker
    value={dob || new Date(2000, 0, 1)}
    mode="date"
    display={Platform.OS === "ios" ? "spinner" : "default"}
    maximumDate={new Date()}
    themeVariant={Platform.OS === "ios" ? "dark" : "light"} // optional styling
    onChange={(event, selectedDate) => {
      if (Platform.OS === "android") {
        setShowPicker(false); // Close after one tap
        if (event.type === "set" && selectedDate) {
          setDob(selectedDate);
          dobRef.current = selectedDate.toISOString().split("T")[0];
        }
      } else if (selectedDate) {
        // On iOS, it doesn't auto-close; just save value
        setDob(selectedDate);
        dobRef.current = selectedDate.toISOString().split("T")[0];
      }
    }}
  />
)}


          <Input
            placeholder="Enter your email"
            onChangeText={(text) => (emailRef.current = text)}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) => (passwordRef.current = text)}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Button
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.loginButton}
          >
            <Typo fontWeight="700" color={colors.white} size={20}>
              Sign Up
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15} color={colors.text}>
            Already have an account?
          </Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")}>
            <Typo size={15} color={colors.purple} fontWeight="700">
              Login
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeTextContainer: {
    gap: 5,
    marginTop: spacingY._20,
  },
  welcomeText: {
    fontSize: verticalScale(30),
  },
  form: {
    gap: spacingY._20,
    marginTop: spacingY._30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: "auto",
    paddingVertical: spacingY._20,
  },
  loginButton: {
    marginTop: spacingY._20,
    backgroundColor: colors.purple,
    borderRadius: 12,
    paddingVertical: spacingY._15,
    minHeight: verticalScale(54),
    justifyContent: "center",
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default Register;
