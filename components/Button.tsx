import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Typo from "@/components/Typo";
import Loading from "@/components/Loading"; // Fixed path

type CustomButtonProps = {
    style?: ViewStyle;
    onPress?: () => void;
    loading?: boolean;
    children: React.ReactNode;
};

const Button = ({ style, onPress, loading = false, children }: CustomButtonProps) => {
    if (loading) {
        return <Loading />;
    }

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius._17,
        height: verticalScale(48),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Button;