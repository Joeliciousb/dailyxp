import db from "./db";

export const addQuest = async (quest: Quest) => {
  try {
    const database = await db;
    await database.runAsync(
      `INSERT INTO quests (title, description, task, questGiver, experience, gold) VALUES (?, ?, ?, ?, ?, ?)`,
      quest.title,
      quest.description,
      quest.task,
      quest.questGiver,
      quest.experience,
      quest.gold
    );
  } catch (error) {
    console.error(error);
  }
};

export const getQuests = async () => {
  try {
    const database = await db;
    const allRows: Quest[] = await database.getAllAsync("SELECT * FROM quests");
    return allRows;
  } catch (error) {
    console.error("Error getting quests:", error);
    return [];
  }
};
