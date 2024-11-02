import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../utils/theme";

const QuestCard = ({ quest }: { quest: Quest }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.textQuestGiver}>{quest.questGiver}</Text>
      <LinearGradient
        style={styles.questContainer}
        colors={[
          "#B07930",
          "#EBAF61",
          "#EFBF80",
          "#E3A759",
          "#E4AE64",
          "#B07930",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <ScrollView>
          <Text style={styles.textTitle}>{quest.title}</Text>
          <Text style={styles.textBody}>{quest.description}</Text>
          <Text style={styles.textBody}>{quest.task}</Text>
          <Text>{quest.experience} XP</Text>
        </ScrollView>
      </LinearGradient>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => console.log("Accept")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Accept</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Decline")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Decline</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.secondary,
    marginBottom: 16,
    padding: 4,
    width: 200,
    height: 400,
    justifyContent: "flex-end",
  },
  questContainer: {
    borderColor: "black",
    height: 325,
    borderWidth: 1,
    borderRadius: 4,
    overflow: "hidden",
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 8,
  },
  textBody: {
    fontSize: 16,
    padding: 8,
  },
  textQuestGiver: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 4,
  },
  button: {
    backgroundColor: theme.colors.buttonRed,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: theme.colors.text,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
