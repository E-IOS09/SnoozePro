import { Alert, Pressable, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Button from "@/components/Button";
import * as Icons from 'phosphor-react-native';
import { useAuth } from "@/contexts/authContext";

const Register = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    const dobRef = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {register: registerUser} = useAuth();

    const handleSubmit = async () => {
        if(!emailRef.current || !passwordRef.current || !nameRef.current || !dobRef.current) {
            Alert.alert('Sign up' , "Please fill all the field");
            return;
        }
        setIsLoading(true);
        const res = await registerUser(
            emailRef.current,
            passwordRef.current,
            nameRef.current
        );
        setIsLoading(false);
        console.log("register result : " , res);
        if (!res.success) {
            Alert.alert("Sign up" , res.msg)
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <BackButton iconSize={28}/>
                <View style={styles.welcomeTextContainer}>
                    <Typo size={30} fontWeight="800" style={styles.welcomeText}>
                        Let's,
                    </Typo>
                    <Typo size={30} fontWeight="800" style={styles.welcomeText}>
                        Get Started 
                    </Typo>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <Typo size={16} color={colors.textLight}>
                        Create an account to track your sleep 
                    </Typo>

                    <Input 
                        placeholder="Enter your name"
                        onChangeText={(text) => (nameRef.current = text)}
                        icon={<Icons.User
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />} Ref={undefined}
                    
                     />

                    <Input 
                        placeholder="Enter your dob"
                        onChangeText={(text) => (dobRef.current = text)}
                        icon={<Icons.Calendar
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />} Ref={undefined}
                    
                     />


                    <Input 
                        placeholder="Enter your email"
                        onChangeText={(text) => (emailRef.current = text)}
                        icon={<Icons.At
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />} Ref={undefined}
                    
                     />


                    <Input 
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={(text) => (passwordRef.current = text)}
                        icon={<Icons.Lock
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />} Ref={undefined}                    />


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

                {/* Footer */}
                <View style={styles.footer}>
                    <Typo size={15} color={colors.text}>
                        Already  have an account? 
                    </Typo>
                    <Pressable 
                        onPress={() => router.navigate("/(auth)/login")}
                        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                    >
                        <Typo size={15} color={colors.primary} fontWeight={'700'}>
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
    loginButton: {
        marginTop: spacingY._20,
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: spacingY._15,
        // Add these fixes:
        minHeight: verticalScale(54),  // Ensure button height
        justifyContent: 'center',
        shadowColor: colors.neutral900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    }
});

export default Register;