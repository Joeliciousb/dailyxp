import { Character, Item } from "../interface/types";

type HandleEquipItemProps = {
  item: Item | null;
  character: Character | null;
  setCharacter: (character: Character | null) => void;
};

export const handleEquipItem = ({
  item,
  character,
  setCharacter,
}: HandleEquipItemProps) => {
  if (!character || !item) return;

  if (item.equipped) {
    setCharacter({
      ...character,
      inventory: character.inventory.map((invItem) =>
        invItem.id === item.id ? { ...invItem, equipped: false } : invItem
      ),
    });
  } else {
    setCharacter({
      ...character,
      inventory: character.inventory.map((invItem) =>
        invItem.type === item.type
          ? { ...invItem, equipped: invItem.id === item.id }
          : invItem
      ),
    });
  }
};
