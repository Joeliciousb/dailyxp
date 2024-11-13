import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import theme from "../utils/theme";
import { Quest } from "../interface/types";

type QuestCardProps = {
  quest: Quest;
  handleQuestComplete: (quest: Quest) => void;
};

const AcceptedQuestCard = ({ quest, handleQuestComplete }: QuestCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.questOverview}>
        <Image source={require("../assets/images/dwarf_mugshot.png")} />
        <View style={styles.questInformation}>
          <Text style={{ color: "white" }}>{quest.title}</Text>
          <Text style={{ color: "white" }}>{quest.task}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => console.log("kaka")}>
          <View style={{ backgroundColor: "red", padding: 10 }}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleQuestComplete(quest)}>
          <View style={{ backgroundColor: "green", padding: 10 }}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AcceptedQuestCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "75%",
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    margin: 16,
    borderRadius: 8,
  },
  questOverview: {
    flex: 1,
    flexDirection: "row",
  },
  questInformation: {
    flex: 2,
    flexDirection: "column",
  },
  actionsRow: {
    flexDirection: "row",
  },
});
