import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import theme from "../utils/theme";

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
      <Image source={require("../assets/images/dwarf_mugshot.png")} />
      <Text style={{ color: "white" }}>{quest.title}</Text>
    </TouchableOpacity>
  );
};

export default QuestCard;

const styles = StyleSheet.create({
  questPreview: {
    flexDirection: "row",
    width: "75%",
    backgroundColor: theme.colors.secondary,
    padding: 8,
    margin: 16,
    alignItems: "center",
  },
});
