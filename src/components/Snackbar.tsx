import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import theme from "../utils/theme";
import Animated, { FadeIn } from "react-native-reanimated";

type SnackBarProps = {
  message: string;
  actionText?: string;
  onActionPress?: () => void;
};

const Snackbar = ({ message, actionText, onActionPress }: SnackBarProps) => {
  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <View style={styles.container}>
        <Text style={styles.messageText}>{message}</Text>
        {actionText && (
          <TouchableOpacity onPress={onActionPress}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    width: "80%",
    borderRadius: 4,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-around",
    left: 42,
    bottom: 30,
  },
  messageText: {
    fontSize: 16,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Snackbar;
