import React from "react";
import { ImageBackground, View } from "react-native";
import { useCharacterContext } from "../services/CharacterContext";
import { getImage } from "../utils/imageMappings";

const BackgroundImage = ({ children }: { children: JSX.Element }) => {
  const { character } = useCharacterContext();

  const equippedWallpaper = character?.inventory.find(
    (item) => item.equipped && item.type === "wallpaper"
  );

  const source = equippedWallpaper
    ? getImage(equippedWallpaper.type, equippedWallpaper.id)
    : getImage("wallpaper", "classic"); // default wallpaper

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={source}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundImage;
