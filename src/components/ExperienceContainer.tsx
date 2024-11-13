import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCharacterContext } from "../services/CharacterContext";
import {
  calculateLevel,
  totalExperienceToNextLevel,
} from "../utils/levelCalculations";
import theme from "../utils/theme";

const ExperienceContainer = () => {
  const { character } = useCharacterContext();

  const currentLevel = calculateLevel(character!.experience);
  const nextLevelXP = totalExperienceToNextLevel(currentLevel);
  const currentXP = character!.experience;

  const xpInCurrentLevel =
    currentXP - (totalExperienceToNextLevel(currentLevel - 1) || 0);
  const xpRequiredForNextLevel =
    nextLevelXP - (totalExperienceToNextLevel(currentLevel - 1) || 0);

  return (
    <View style={styles.level_container}>
      <Text style={styles.text_level}>
        {calculateLevel(character!.experience)}
      </Text>
      <Text style={styles.text_xp}>
        {xpInCurrentLevel} / {xpRequiredForNextLevel}
      </Text>
    </View>
  );
};

export default ExperienceContainer;

const styles = StyleSheet.create({
  level_container: {
    backgroundColor: theme.colors.purple,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text_level: {
    fontSize: theme.fonts.size.xLarge,
    fontWeight: "bold",
    color: theme.fonts.color.white,
  },
  text_xp: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "bold",
    color: theme.fonts.color.white,
  },
});
