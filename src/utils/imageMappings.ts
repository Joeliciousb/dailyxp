import { ImageSourcePropType } from "react-native";

// Define a mapping of races to body types and their respective images
export const images: {
  [race: string]: { [body: string]: ImageSourcePropType };
} = {
  human: {
    body1: require("../assets/images/races/body1/human.png"),
    body2: require("../assets/images/races/body2/human.png"),
  },
  dwarf: {
    body1: require("../assets/images/races/body1/dwarf.png"),
    body2: require("../assets/images/races/body2/dwarf.png"),
  },
  nightelf: {
    body1: require("../assets/images/races/body1/nightelf.png"),
    body2: require("../assets/images/races/body2/nightelf.png"),
  },
  gnome: {
    body1: require("../assets/images/races/body1/gnome.png"),
    body2: require("../assets/images/races/body2/gnome.png"),
  },
  orc: {
    body1: require("../assets/images/races/body1/orc.png"),
    body2: require("../assets/images/races/body2/orc.png"),
  },
  undead: {
    body1: require("../assets/images/races/body1/undead.png"),
    body2: require("../assets/images/races/body2/undead.png"),
  },
  tauren: {
    body1: require("../assets/images/races/body1/tauren.png"),
    body2: require("../assets/images/races/body2/tauren.png"),
  },
  troll: {
    body1: require("../assets/images/races/body1/troll.png"),
    body2: require("../assets/images/races/body2/troll.png"),
  },
};

export const getRaceImage = (
  race: string,
  body: string
): ImageSourcePropType => {
  return images[race]?.[body];
};
