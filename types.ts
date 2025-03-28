import { Href } from "expo-router";
import { ReactNode } from "react";
import {
  ActivityIndicatorProps,
  PressableProps,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Icon } from "phosphor-react-native";

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
  routeName?: Href;
};

// Typography props
export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: ReactNode;
  style?: TextStyle;
  textProps?: TextProps;
};

// Custom button props
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
};

// App button props
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

// Back button props
export type BackButtonProps = {
  style?: string;
  iconSize?: number;
};

// General input props
export interface InputProps extends TextInputProps {
  Ref?: any;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
}

// User types
export type UserType = {
  uid?: string;
  email?: string | null;
  name: string | null;
  image?: any | null;
};

export type UserDataType = {
  name: string;
  image?: any;
};

// Auth context type
export type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; msg?: string }>;
  updateUserData: (userId: string) => Promise<void>;
};
