import { ImageSourcePropType } from "react-native";

export const images: {
  [category: string]: { [image: string]: ImageSourcePropType };
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
  wallpaper: {
    classic: require("../assets/images/backgrounds/classic.png"),
    wrath: require("../assets/images/backgrounds/wrath.png"),
    panda: require("../assets/images/backgrounds/panda.png"),
    teldrassil: require("../assets/images/backgrounds/teldrassil.png"),
    deathwing: require("../assets/images/backgrounds/deathwing.png"),
  },
  title: {
    insane: require("../assets/images/titles/insane.png"),
    jenkins: require("../assets/images/titles/jenkins.png"),
    patient: require("../assets/images/titles/patient.png"),
  },
};

export const getImage = (
  category: string,
  image: string
): ImageSourcePropType => {
  return images[category]?.[image];
};
