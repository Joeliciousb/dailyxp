import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";
import theme from "../utils/theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button = ({ title, onPress, disabled }: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.buttonRed,
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: theme.fonts.color.gold,
    fontSize: theme.fonts.size.medium,
  },
  disabled: {
    opacity: 0.3,
  },
});
