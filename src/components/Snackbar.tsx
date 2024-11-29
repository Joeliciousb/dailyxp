import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../utils/theme";
import Animated, { FadeIn } from "react-native-reanimated";
import Button from "./Button";

type SnackBarProps = {
  message: string;
  actionText?: string;
  onActionPress?: () => void;
};

const Snackbar = ({ message, actionText, onActionPress }: SnackBarProps) => {
  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <View
        style={[
          styles.container,
          { justifyContent: actionText ? "space-between" : "center" },
        ]}
      >
        <Text style={styles.messageText}>{message}</Text>
        {actionText && onActionPress && (
          <Button title={actionText} onPress={onActionPress} />
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    padding: 20,
    width: "80%",
    borderRadius: 4,
    flexDirection: "row",
    position: "absolute",
    left: 42,
    bottom: 30,
  },
  messageText: {
    fontSize: theme.fonts.size.large,
    color: theme.fonts.color.white,
    padding: 8,
  },
});

export default Snackbar;
