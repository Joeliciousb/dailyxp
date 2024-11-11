import AsyncStorage from "@react-native-async-storage/async-storage";

const CHARACTER_KEY = "character";

export const saveCharacter = async (character: Character): Promise<void> => {
  try {
    await AsyncStorage.setItem(CHARACTER_KEY, JSON.stringify(character));
  } catch (error) {
    console.error("Failed to save character:", error);
  }
};

export const loadCharacter = async (): Promise<Character | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CHARACTER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Failed to load character:", error);
    return null;
  }
};

export const characterExists = async (): Promise<boolean> => {
  const character = await loadCharacter();
  return character !== null;
};

export const deleteCharacter = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CHARACTER_KEY);
  } catch (error) {
    console.error("Failed to delete character:", error);
  }
};
