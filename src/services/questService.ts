import AsyncStorage from "@react-native-async-storage/async-storage";
import { Quest } from "../interface/types";
import questData from "../assets/data/initialQuests.json";

const QUESTS_KEY = "quests";
const RESET_TIMESTAMP_KEY = "resetTimestamp";

export const ifNewDaySelectRandomDailyQuests = async (): Promise<void> => {
  try {
    const now = new Date();
    const todayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();

    const savedTimestamp = await AsyncStorage.getItem(RESET_TIMESTAMP_KEY);

    if (!savedTimestamp || Number(savedTimestamp) < todayMidnight) {
      const newQuests = selectRandomQuests(questData.initialQuests, 12);
      await AsyncStorage.setItem(QUESTS_KEY, JSON.stringify(newQuests));
      await AsyncStorage.setItem(RESET_TIMESTAMP_KEY, todayMidnight.toString());
    }
  } catch (error) {
    console.error("Failed to select random dailies:", error);
  }
};

const selectRandomQuests = (quests: Quest[], count: number): Quest[] => {
  const shuffled = quests.sort(() => 0.5 - Math.random());
  const slicedArray = shuffled.slice(0, count);
  return slicedArray.map((quest) => ({ ...quest, status: "available" }));
};

export const loadDailyQuests = async (): Promise<Quest[] | null> => {
  try {
    const dailyQuests = await AsyncStorage.getItem(QUESTS_KEY);
    return dailyQuests != null ? JSON.parse(dailyQuests) : null;
  } catch (error) {
    console.error("Failed to load daily quests:", error);
    return null;
  }
};

export const completeQuest = async (
  completedQuestId: number
): Promise<void> => {
  try {
    const jsonValue = await AsyncStorage.getItem(QUESTS_KEY);
    if (!jsonValue) {
      console.error("No daily quests found.");
      return;
    }
    const quests: Quest[] = JSON.parse(jsonValue);
    const updatedQuests = quests.filter(
      (quest) => quest.id !== completedQuestId
    );
    await AsyncStorage.setItem(QUESTS_KEY, JSON.stringify(updatedQuests));
  } catch (error) {
    console.error("Failed to complete quest:", error);
  }
};
