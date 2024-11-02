import { StyleSheet, Text, View } from "react-native";
import theme from "../utils/theme";

const ExperienceContainer = () => {
  return (
    <View style={styles.level_container}>
      <Text style={styles.text}>13</Text>
    </View>
  );
};

export default ExperienceContainer;

const styles = StyleSheet.create({
  level_container: {
    backgroundColor: "#5C0C5D",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
