import React from "react";
import { Text as TextNative, TextProps, StyleSheet } from "react-native";
import theme from "../utils/theme";

const Text = ({ style, ...props }: TextProps) => {
  return <TextNative style={[styles.defaultText, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: theme.fonts.family.lifeCraft,
  },
});

export default Text;
