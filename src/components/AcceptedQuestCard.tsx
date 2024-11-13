import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import theme from "../utils/theme";
import { Quest } from "../interface/types";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
        <Image source={require("../assets/images/dwarf_mugshot.png")} />
        <View style={styles.questInformation}>
          <Text style={{ color: "white", fontSize: 16 }}>{quest.title}</Text>
          <Text style={{ color: "white" }}>{quest.task}</Text>
          <View style={{ marginTop: 8 }}>
            <Text style={{ color: "white", fontSize: 12 }}>
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
              <FontAwesome6 name="coins" size={12} color={theme.colors.text} />
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
});