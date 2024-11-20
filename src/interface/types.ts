export type Quest = {
  id: number;
  status?: string;
  title: string;
  description: string;
  task: string;
  questGiver: {
    name: string;
    race: string;
    body: string;
  };
  experience: number;
  gold: number;
};

export type Character = {
  race: string;
  bodyType: string;
  name: string;
  experience: number;
  gold: number;
  questsCompleted: number;
};

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  CreateCharacter: undefined;
  Settings: undefined;
  Shop: undefined;
};
