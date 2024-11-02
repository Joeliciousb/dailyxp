import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import QuestCard from "../components/QuestCard";
import theme from "../utils/theme";
import { getQuests } from "../db/questModel";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const [quests, setQuests] = React.useState<Quest[]>([]);

  React.useEffect(() => {
    getAllQuests();
  }, []);

  const getAllQuests = async () => {
    const allQuests = await getQuests();
    if (allQuests) {
      setQuests(allQuests);
    }
  };

  return (
    <LinearGradient
      colors={theme.colors.background}
      style={styles.backgroundContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <SafeAreaView style={styles.container}>
        <AppBar />
        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.grid}>
            {quests.length > 0 &&
              quests.map((quest, index) => (
                <QuestCard key={index} quest={quest} />
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  scrollContainer: {
    flex: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  backgroundContainer: {
    flex: 1,
  },
});
