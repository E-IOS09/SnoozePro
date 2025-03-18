import { Href } from "expo-router";
import { ReactNode } from "react";
import {
  ActivityIndicatorProps,
  PressableProps,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Icon } from "phosphor-react-native";
import { colors } from "./constants/theme";

// Screen wrapper props
export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: ReactNode;
};

// Modal wrapper props
export type ModalWrapperProps = {
  style?: ViewStyle;
  children: ReactNode;
  bg?: string;
};

// Account option type
export type AccountOptionType = {
  title: string;
  icon: ReactNode;
  bgColor: string;
  routeName?: Href; // Use Href type from expo-router
};

// Add these additional type enhancements:
export type TypoProps =  {
    size?: number;
    color?: string;
    fontWeight?: TextStyle["fontWeight"];
    children: any | null ;
    style? : TextStyle;
    textProps? :TextProps;

  };
   
  // For button.tsx : Custom Button 
  export interface CustomButtonProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onPress?: () => void;
    loading?: boolean;
    hasShadow?: boolean;
    children: React.ReactNode;
}

// Text component props
export type AppTextProps = TextProps & {
  style?: TextStyle;
//   variant?: keyof typeof colors.textVariants;
};

// Button component props
export type AppButtonProps = TouchableOpacityProps & {
  variant?: "primary" | "secondary";
  loading?: boolean;
  loaderProps?: ActivityIndicatorProps;
};

// Input component props
export type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  icon?: Icon;
};