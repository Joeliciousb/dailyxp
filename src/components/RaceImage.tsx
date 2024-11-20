import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { getRaceImage } from "../utils/imageMappings";

type RaceImageProps = {
  body: string;
  race: string;
  isSelected?: boolean;
};

const RaceImage = ({ body, race, isSelected }: RaceImageProps) => {
  const source = getRaceImage(race, body);

  return (
    <View style={[styles.imageContainer, isSelected && styles.selected]}>
      <Image source={source} style={styles.image} resizeMode="cover" />
    </View>
  );
};

export default RaceImage;

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
  },
  selected: {
    borderColor: "gold",
    borderWidth: 2,
    shadowColor: "gold",
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
});
