import { StyleSheet, Text, View } from "react-native";
import ExperienceContainer from "./ExperienceContainer";
import Feather from "@expo/vector-icons/Feather";

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dailyxp</Text>
      <ExperienceContainer />
      <Feather name="user" size={30} color="white" />
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
