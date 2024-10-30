type Quest = {
  title: String;
  description: String;
  task: String;
  questGiver: String;
  reward: Reward;
};

type Reward = {
  experience: number;
  gold: number;
};

type Character = {
  race: String;
  name: String;
  experience: number;
  gold: number;
  questsCompleted?: number;
};
