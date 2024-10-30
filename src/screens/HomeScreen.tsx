import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import QuestCard from "../components/QuestCard";
import theme from "../utils/theme";

const HomeScreen = () => {
  const quest1: Quest = {
    title: "Defend the Village",
    description:
      "The village is under attack by a group of marauding bandits. Help defend the villagers and chase the bandits away.",
    task: "Run for 10 minutes",
    questGiver: "Elder Tomas",
    reward: {
      experience: 300,
      gold: 50,
    },
  };

  const quest2: Quest = {
    title: "Gather Herbs for Healing",
    description:
      "The village healer is in desperate need of healing herbs to treat the injured. Collect 10 healing herbs from the nearby forest.",
    task: "Do 15 squats",
    questGiver: "Healer Linara",
    reward: {
      experience: 150,
      gold: 20,
    },
  };

  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaView style={styles.container}>
        <AppBar />
        <View style={styles.grid}>
          <QuestCard quest={quest1} />
          <QuestCard quest={quest2} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  grid: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  backgroundContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primary,
  },
});
