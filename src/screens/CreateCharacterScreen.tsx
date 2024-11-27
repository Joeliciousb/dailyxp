import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Text from "../components/Text";
import theme from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { Character, RootStackParamList } from "../interface/types";
import { useCharacterContext } from "../services/CharacterContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackgroundImage from "./BackgroundImage";
import RaceImage from "../components/RaceImage";
import Button from "../components/Button";

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
    inventory: [
      {
        id: "classic",
        name: "Classic wallpaper",
        price: 0,
        equipped: true,
        type: "wallpaper",
      },
    ],
  });

  const handleRaceClick = (selectedRace: string) => {
    setNewCharacter({ ...newCharacter, race: selectedRace });
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

  const invalidName =
    (newCharacter.name != "" && newCharacter.name.length < 3) ||
    newCharacter.name.length > 14;

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.raceContainer}>
          <View style={styles.raceColumn}>
            <TouchableOpacity onPress={() => handleRaceClick("human")}>
              <RaceImage
                body={bodyType}
                race="human"
                isSelected={newCharacter.race === "human"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRaceClick("dwarf")}>
              <RaceImage
                body={bodyType}
                race="dwarf"
                isSelected={newCharacter.race === "dwarf"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRaceClick("nightelf")}>
              <RaceImage
                body={bodyType}
                race="nightelf"
                isSelected={newCharacter.race === "nightelf"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRaceClick("gnome")}>
              <RaceImage
                body={bodyType}
                race="gnome"
                isSelected={newCharacter.race === "gnome"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.raceColumn}>
            <TouchableOpacity onPress={() => handleRaceClick("orc")}>
              <RaceImage
                body={bodyType}
                race="orc"
                isSelected={newCharacter.race === "orc"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRaceClick("undead")}>
              <RaceImage
                body={bodyType}
                race="undead"
                isSelected={newCharacter.race === "undead"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRaceClick("tauren")}>
              <RaceImage
                body={bodyType}
                race="tauren"
                isSelected={newCharacter.race === "tauren"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRaceClick("troll")}>
              <RaceImage
                body={bodyType}
                race="troll"
                isSelected={newCharacter.race === "troll"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyTypeRow}>
          <TouchableOpacity onPress={() => handleBodyTypeClick("body1")}>
            <Image
              style={styles.bodyTypeImage}
              source={require("../assets/images/races/body1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBodyTypeClick("body2")}>
            <Image
              style={styles.bodyTypeImage}
              source={require("../assets/images/races/body2.png")}
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
        {invalidName && (
          <Text style={{ fontSize: 16, color: "red", marginBottom: 8 }}>
            Name must be between 3 to 15 characters.
          </Text>
        )}

        <Button
          disabled={invalidName || newCharacter.name == ""}
          onPress={saveNewCharacter}
          title="Accept"
        />
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
    padding: 16,
  },
  bodyTypeRow: {
    flexDirection: "row",
    padding: 8,
  },
  bodyTypeImage: {
    height: 80,
    width: 80,
    margin: 8,
  },
  input: {
    height: 40,
    width: "40%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: theme.colors.opacity_50,
    borderColor: theme.colors.secondary,
    padding: 10,
    color: "white",
  },
});

export default CreateCharacterScreen;
