import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const QuestCard = ({ quest }: { quest: Quest }) => {
  return (
    <LinearGradient
      style={styles.container}
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
      <Text style={styles.title}>{quest.title}</Text>
      <Text style={styles.description}>{quest.description}</Text>
      <Text style={styles.description}>{quest.task}</Text>
      <Text>{quest.reward.experience}</Text>
    </LinearGradient>
  );
};

export default QuestCard;

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderColor: "black",
    borderWidth: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 8,
  },
  description: {
    fontSize: 16,
    padding: 8,
  },
});
