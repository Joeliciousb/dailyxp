export const totalExperienceToNextLevel = (level: number): number => {
  return 50 + 75 * (level - 1) + 25 * (level - 1) ** 2;
};

export const calculateLevel = (experience: number): number => {
  let level = 1;
  let experienceRequiredToLevelUp = totalExperienceToNextLevel(level);

  while (experience >= experienceRequiredToLevelUp && level < 60) {
    level++;
    experienceRequiredToLevelUp = totalExperienceToNextLevel(level);
  }

  return level;
};
