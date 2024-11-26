import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";
import theme from "../utils/theme";
import { Quest } from "../interface/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import RaceImage from "./RaceImage";

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
      <RaceImage race={quest.questGiver.race} body={quest.questGiver.body} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{quest.title}</Text>
      </View>
      <FontAwesome5
        name="exclamation"
        color={theme.fonts.color.gold}
        size={30}
        style={styles.icon}
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
  textContainer: {
    flex: 1,
    marginHorizontal: theme.spacing.small,
  },
  titleText: {
    color: theme.fonts.color.white,
    fontSize: theme.fonts.size.large,
    flexWrap: "wrap",
  },
  icon: {
    marginRight: 8,
    flexShrink: 0,
  },
});
