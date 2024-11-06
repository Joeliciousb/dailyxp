import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import theme from "../utils/theme";
import { addCharacter } from "../db/characterModel";

const CreateCharacterScreen = () => {
  const [newCharacter, setNewCharacter] = React.useState<Character>({
    name: "",
    race: "",
    experience: 0,
    gold: 0,
  });
  const saveNewCharacter = () => {
    try {
      addCharacter(newCharacter);
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={newCharacter.name}
        onChangeText={(e) => setNewCharacter({ ...newCharacter, name: e })}
      />
      <TextInput
        style={styles.input}
        placeholder="race"
        value={newCharacter.race}
        onChangeText={(e) => setNewCharacter({ ...newCharacter, race: e })}
      />
      <TouchableOpacity onPress={saveNewCharacter}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Accept</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  button: {
    backgroundColor: theme.colors.buttonRed,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: theme.colors.text,
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
