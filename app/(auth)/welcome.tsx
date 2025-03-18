import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Typo from "@/components/Typo";
import Button from "@/components/Button";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Welcome = () => {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* Login Section */}
                <View>
                    <TouchableOpacity onPress={()=> router.push('/(auth)/login')} style={styles.loginButton}>
                        <Typo fontWeight="500">Sign in</Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(2000)} // loading the image 
                        source={require("../../assets/images/welcome.jpg")}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Footer Section */}
                <Animated.View
                    entering={FadeInDown.delay(500).duration(1000).springify().damping(12)} // text loading 
                    style={styles.footer}
                >
                    <View style={{ alignItems: "center" }}>
                        <Typo size={30} fontWeight="800">Always take control</Typo>
                        <Typo size={30} fontWeight="800">of your finances</Typo>
                    </View>

                    <Animated.View
                    entering={FadeInDown.delay(500).duration(1000).delay(100).springify().damping(12)}
                     style={{ alignItems: "center", gap: 2 }}>
                        <Typo size={17} color={colors.textLight}>
                            Finances must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={colors.textLight}>
                            lifestyle in future
                        </Typo>
                    </Animated.View>

                    <Animated.View
                    entering={FadeInDown.delay(500).duration(1000).delay(200).springify().damping(12)}
                     style={styles.buttonContainer}>
                        <Button onPress={()=> router.push("/(auth)/register")}>
                            <Typo size={22} color={colors.neutral900} fontWeight="600">
                                Get Started
                            </Typo>
                        </Button>
                    </Animated.View>
                </Animated.View>
            </View>
        </ScreenWrapper>
    );
};

// Keep your existing styles

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: spacingY._7,
    },
    welcomeImage: {
        width: "100%",
        height: verticalScale(300),
        alignSelf: "center",
        marginTop: verticalScale(100),
    },
    loginButton: {
        alignSelf: "flex-end",
        marginRight: spacingX._20,
        padding: 10 // Added for better touch area
    },
    footer: {
        backgroundColor: colors.neutral900,
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._25,
        marginTop: 20
    },
    getStartedButton: {
        width: "100%",
        height: verticalScale(55),
    }
});