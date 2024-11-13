import AsyncStorage from "@react-native-async-storage/async-storage";
import { Quest } from "../interface/types";

const ACCEPTED_QUESTS_KEY = "acceptedQuests";

export const saveAcceptedQuests = async (quests: Quest[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACCEPTED_QUESTS_KEY, JSON.stringify(quests));
  } catch (error) {
    console.error("Failed to save accepted quests:", error);
  }
};

export const loadAcceptedQuests = async (): Promise<Quest[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(ACCEPTED_QUESTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Failed to load accepted quests:", error);
    return null;
  }
};

export const acceptedQuestsExist = async (): Promise<boolean> => {
  const quests = await loadAcceptedQuests();
  return quests !== null && quests.length > 0;
};

export const deleteAcceptedQuests = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ACCEPTED_QUESTS_KEY);
  } catch (error) {
    console.error("Failed to delete accepted quests:", error);
  }
};
