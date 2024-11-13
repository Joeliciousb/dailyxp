export type Quest = {
  id: number;
  title: string;
  description: string;
  task: string;
  questGiver: string;
  experience: number;
  gold: number;
};

export type Character = {
  race: string;
  name: string;
  experience: number;
  gold: number;
  questsCompleted?: number;
};
