import { StyleSheet, Text, View } from "react-native";
import ExperienceContainer from "./ExperienceContainer";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import theme from "../utils/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interface/types";

const AppBar = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.text}>Dailyxp</Text>
      </View>
      <View>
        <ExperienceContainer />
      </View>
      <View style={styles.profileContainer}>
        <Feather
          name="user"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
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
    padding: theme.spacing.medium,
  },
  text: {
    fontSize: theme.fonts.size.xLarge,
    fontWeight: "bold",
    color: theme.fonts.color.gold,
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  profileContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
