import { StyleSheet, Text, View } from "react-native";
import theme from "../utils/theme";
import { Quest } from "../interface/types";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import RaceImage from "./RaceImage";

type QuestCardProps = {
  quest: Quest;
  handleQuestComplete: (quest: Quest) => void;
  handleQuestAbandon: (id: number) => void;
};

const AcceptedQuestCard = ({
  quest,
  handleQuestComplete,
  handleQuestAbandon,
}: QuestCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.questOverview}>
        <RaceImage race={quest.questGiver.race} body={quest.questGiver.body} />
        <View style={styles.questInformation}>
          <Text style={styles.titleText}>{quest.title}</Text>
          <Text style={styles.taskText}>{`Task: ${quest.task}`}</Text>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.rewardText}>
              {`Experience: ${quest.experience}`}
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 4 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  marginRight: 8,
                }}
              >
                {quest.gold}
              </Text>
              <FontAwesome6
                name="coins"
                size={12}
                color={theme.fonts.color.gold}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <Feather
          name="x-square"
          size={30}
          color="red"
          onPress={() => handleQuestAbandon(quest.id)}
        />
        <Feather
          name="check-square"
          size={30}
          color={"green"}
          onPress={() => handleQuestComplete(quest)}
        />
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
    padding: theme.spacing.small,
    margin: theme.spacing.medium,
    borderRadius: theme.spacing.small,
  },
  questOverview: {
    flex: 1,
    flexDirection: "row",
  },
  questInformation: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: theme.spacing.small,
  },
  actionsRow: {
    flexDirection: "row",
  },
  titleText: {
    fontSize: theme.fonts.size.medium,
    color: theme.fonts.color.white,
    marginBottom: theme.spacing.small,
  },
  taskText: {
    fontSize: theme.fonts.size.small,
    color: theme.fonts.color.white,
  },
  rewardText: {
    fontSize: theme.fonts.size.small,
    color: theme.fonts.color.white,
  },
  image: {
    height: 70,
    width: 70,
  },
});
