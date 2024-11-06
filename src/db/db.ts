import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("dailyxp.db");

export const initialize = async () => {
  try {
    (await db).execAsync(
      `CREATE TABLE IF NOT EXISTS quests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            task TEXT,
            questGiver TEXT,
            experience INTEGER,
            gold INTEGER,
            completed BOOLEAN DEFAULT 0
          );` +
        `CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            race TEXT,
            experience INTEGER,
            gold INTEGER,
            questsCompleted INTEGER
          );`
    );
  } catch (error) {
    console.error(error);
  }
};

export default db;
