import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../utils/theme";
import { getRaceImage } from "../utils/imageMappings";

type RaceImageProps = {
  body: string;
  race: string;
  selectedRace: string;
  selectedBodyType: string;
  handleRaceClick: (race: string) => void;
};

const RaceImage = ({
  body,
  race,
  handleRaceClick,
  selectedRace,
  selectedBodyType,
}: RaceImageProps) => {
  const source = getRaceImage(race, body);

  const isSelected = race === selectedRace && body === selectedBodyType;

  return (
    <TouchableOpacity onPress={() => handleRaceClick(race)}>
      <View style={[styles.imageContainer, isSelected && styles.selected]}>
        <Image source={source} style={styles.image} />
      </View>
    </TouchableOpacity>
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
    borderColor: theme.fonts.color.gold,
    borderWidth: 2,
    shadowColor: theme.fonts.color.gold,
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
});
