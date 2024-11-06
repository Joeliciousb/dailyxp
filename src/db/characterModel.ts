import db from "./db";

export const addCharacter = async (character: Character) => {
  try {
    const database = await db;
    await database.runAsync(
      `INSERT INTO characters (name, race, experience, gold) VALUES (?, ?, ?, ?)`,
      character.name,
      character.race,
      character.experience,
      character.gold
    );
  } catch (error) {
    console.error(error);
  }
};

export const getCharacters = async () => {
  try {
    const database = await db;
    const character: Character | null = await database.getFirstAsync(
      "SELECT * FROM characters"
    );
    if (character) {
      return character;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
