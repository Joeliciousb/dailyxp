type Quest = {
  id: number;
  title: string;
  description: string;
  task: string;
  questGiver: string;
  experience: number;
  gold: number;
};

type Character = {
  race: string;
  name: string;
  experience: number;
  gold: number;
  questsCompleted?: number;
};
