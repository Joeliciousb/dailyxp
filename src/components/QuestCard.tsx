import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import theme from "../utils/theme";
import { Quest } from "../interface/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type QuestCardProps = {
  quest: Quest;
  handleQuestPress: (quest: Quest) => void;
};

const QuestCard = ({ quest, handleQuestPress }: QuestCardProps) => {
  return (
    <TouchableOpacity
      key={quest.id}
      onPress={() => handleQuestPress(quest)}
      style={styles.questPreview}
    >
      <Image
        style={styles.image}
        source={require("../assets/images/races/body2/dwarf.png")}
      />
      <Text style={{ color: "white" }}>{quest.title}</Text>
      <FontAwesome5
        name="exclamation"
        color={theme.fonts.color.gold}
        size={30}
      />
    </TouchableOpacity>
  );
};

export default QuestCard;

const styles = StyleSheet.create({
  questPreview: {
    flexDirection: "row",
    width: "75%",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.opacity_75,
    padding: theme.spacing.small,
    margin: theme.spacing.medium,
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
  },
});
