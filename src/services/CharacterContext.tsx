import React from "react";
import { Character } from "../interface/types";
import { loadCharacter, saveCharacter } from "../services/characterService";

type CharacterContextType = {
  character: Character | null;
  setCharacter: (character: Character | null) => void;
  loading: boolean;
};

const CharacterContext = React.createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: { children: JSX.Element }) => {
  const [character, setCharacterState] = React.useState<Character | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeCharacter = async () => {
      const savedCharacter = await loadCharacter();
      setCharacterState(savedCharacter);
      setLoading(false);
    };
    initializeCharacter();
  }, []);

  const setCharacter = React.useCallback((newCharacter: Character | null) => {
    setCharacterState(newCharacter);
    if (newCharacter) {
      saveCharacter(newCharacter);
    }
  }, []);

  return (
    <CharacterContext.Provider value={{ character, setCharacter, loading }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = React.useContext(CharacterContext);

  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }

  return context;
};
