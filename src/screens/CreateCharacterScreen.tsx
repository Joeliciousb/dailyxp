import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import theme from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { Character, RootStackParamList } from "../interface/types";
import { useCharacterContext } from "../services/CharacterContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackgroundImage from "./BackgroundImage";
import RaceImage from "../components/RaceImage";

const CreateCharacterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setCharacter } = useCharacterContext();

  const [bodyType, setBodyType] = React.useState<"body1" | "body2">("body1");
  const [newCharacter, setNewCharacter] = React.useState<Character>({
    name: "",
    race: "human",
    bodyType: bodyType,
    experience: 0,
    gold: 0,
    questsCompleted: 0,
  });

  const handleRaceClick = (race: string) => {
    setNewCharacter({ ...newCharacter, race: race });
  };

  const handleBodyTypeClick = (bodyType: "body1" | "body2") => {
    setBodyType(bodyType);
    setNewCharacter({ ...newCharacter, bodyType: bodyType });
  };

  const saveNewCharacter = async () => {
    try {
      setCharacter(newCharacter);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.raceContainer}>
          <View style={styles.raceColumn}>
            <RaceImage
              body={bodyType}
              race="human"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
            <RaceImage
              body={bodyType}
              race="dwarf"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
            <RaceImage
              body={bodyType}
              race="nightelf"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
            <RaceImage
              body={bodyType}
              race="gnome"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
          </View>
          <View style={styles.raceColumn}>
            <RaceImage
              body={bodyType}
              race="orc"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
            <RaceImage
              body={bodyType}
              race="undead"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
            <RaceImage
              body={bodyType}
              race="tauren"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
            <RaceImage
              body={bodyType}
              race="troll"
              selectedRace={newCharacter.race}
              selectedBodyType={bodyType}
              handleRaceClick={handleRaceClick}
            />
          </View>
        </View>
        <View style={styles.bodyTypeRow}>
          <TouchableOpacity onPress={() => handleBodyTypeClick("body1")}>
            <Image
              style={styles.bodyTypeImage}
              source={require("../assets/images/body1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBodyTypeClick("body2")}>
            <Image
              style={styles.bodyTypeImage}
              source={require("../assets/images/body2.png")}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: theme.fonts.color.gold,
            fontSize: theme.fonts.size.large,
          }}
        >
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={newCharacter.name}
          onChangeText={(e) => setNewCharacter({ ...newCharacter, name: e })}
        />
        <TouchableOpacity onPress={saveNewCharacter}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Accept</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  raceContainer: {
    flexDirection: "row",
  },
  raceColumn: {
    padding: theme.spacing.medium,
  },
  bodyTypeRow: {
    flexDirection: "row",
    padding: theme.spacing.small,
  },
  bodyTypeImage: {
    height: 80,
    width: 80,
    margin: theme.spacing.small,
  },
  button: {
    backgroundColor: theme.colors.buttonRed,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: theme.fonts.color.gold,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CreateCharacterScreen;
