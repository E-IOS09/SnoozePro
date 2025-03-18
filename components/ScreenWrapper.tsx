import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/types";
import { colors } from "@/constants/theme";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    let paddingTop = Platform.OS == "ios" ? height * 0.06 : 50;
    return (
    <View
    style={[ 
    {  // Added object wrapper
        paddingTop: paddingTop,  // Fixed colon syntax
        flex: 1,
        backgroundColor: colors.neutral900,
    },
    style,
    ]}
    > 
    <StatusBar barStyle="light-content" />
    {children}  {/* Changed from <Text> to render children */}
    </View>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});  // Fixed empty style declaration