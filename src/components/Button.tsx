import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../utils/theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
  },
});
