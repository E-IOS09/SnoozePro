import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Button from "@/components/Button"; // Added custom Button import
import * as Icons from 'phosphor-react-native';
import { useRoute } from "@react-navigation/native";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRoute();

    const handleSubmit = () => {
        setIsLoading(true);
        // Add your login logic here
        console.log("Email:", email, "Password:", password);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <BackButton iconSize={28}/>
                <View style={styles.welcomeTextContainer}>
                    <Typo size={30} fontWeight="800" style={styles.welcomeText}>
                        Hey,
                    </Typo>
                    <Typo size={30} fontWeight="800" style={styles.welcomeText}>
                        Welcome Back
                    </Typo>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <Typo size={16} color={colors.textLight}>
                        Login Now
                    </Typo>

                    <Input 
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        icon={<Icons.At
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />} Ref={undefined}                    />

                    <Input 
                        placeholder="Enter your password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        icon={<Icons.Lock
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />} Ref={undefined}                    />

                    <Typo size={14} color={colors.text} style={styles.forgotPassword}>
                        Forgot Password?
                    </Typo>

                    <Button 
                        onPress={handleSubmit}
                        loading={isLoading}
                        style={styles.loginButton}
                    >
                        <Typo fontWeight="700" color={colors.black} size={20}>
                            Login
                        </Typo>
                    </Button>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Typo size={15}>
                        Don't have an account? 
                    </Typo>
                    <Pressable onPress={() => router.push("/(auth)/register")}>
                    <Typo size={15}>
                        Sign Up
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
        marginTop: spacingY._20
    },
    welcomeText: {
        fontSize: verticalScale(30),
    },
    form: {
        gap: spacingY._20,
        marginTop: spacingY._30
    },
    forgotPassword: {
        textAlign: "right",
        marginTop: spacingY._10
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginTop: 'auto',
        paddingVertical: spacingY._20
    },
    footerText: {
        fontSize: verticalScale(15),
    },
    loginButton: {
        marginTop: spacingY._20,
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: spacingY._15
    }
});

export default Login;