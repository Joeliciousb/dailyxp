import { StyleSheet, Text, View } from "react-native";
import theme from "../utils/theme";
import React from "react";
import { useCharacterContext } from "../services/CharacterContext";

const ExperienceContainer = () => {
  const { character } = useCharacterContext();

  function totalXpToNextLevel(level: number): number {
    return 400 + 500 * (level - 1) + 50 * (level - 1) ** 2;
  }

  function mobXp(level: number): number {
    return 50 + 5 * (level - 1);
  }

  function mobsToLevel(level: number): number {
    const totalXp = totalXpToNextLevel(level);
    const xpPerMob = mobXp(level);
    return Math.ceil(totalXp / xpPerMob);
  }
  return (
    <View style={styles.level_container}>
      <Text style={styles.text}>{character?.experience}</Text>
    </View>
  );
};

export default ExperienceContainer;

const styles = StyleSheet.create({
  level_container: {
    backgroundColor: "#5C0C5D",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
