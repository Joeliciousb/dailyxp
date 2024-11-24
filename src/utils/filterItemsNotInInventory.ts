import { Item } from "../interface/types";

export const filterItemsNotInInventory = (
  items: Item[],
  inventory: Item[]
): Item[] => {
  return items.filter(
    (item) => !inventory.some((inventoryItem) => inventoryItem.id === item.id)
  );
};
