import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Svg, Circle } from "react-native-svg";
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

  const progress = xpInCurrentLevel / xpRequiredForNextLevel;

  const radius = 40;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const allowedArc = 0.75 * circumference;
  const progressOffset = allowedArc * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg height="100" width="100">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={theme.colors.secondary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${allowedArc}, ${circumference}`}
          strokeDashoffset={0}
          transform="rotate(135 50 50)"
        />
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={theme.colors.purple}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${allowedArc}, ${circumference}`}
          strokeDashoffset={progressOffset}
          strokeLinecap="butt"
          transform="rotate(135 50 50)"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.textLevel}>{currentLevel}</Text>
        <View style={styles.xpContainer}>
          <Text style={styles.textXP}>
            {xpInCurrentLevel} / {xpRequiredForNextLevel}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExperienceContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
  },
  textLevel: {
    fontSize: theme.fonts.size.xLarge,
    fontWeight: "bold",
    color: theme.fonts.color.white,
  },
  xpContainer: {
    position: "absolute",
    alignItems: "center",
    width: 100,
    marginTop: 40,
  },
  textXP: {
    fontSize: theme.fonts.size.small,
    color: theme.fonts.color.white,
  },
});
