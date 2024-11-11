import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import BackgroundImage from "./BackgroundImage";
import { useNavigation } from "@react-navigation/native";
import { loadCharacter } from "../services/characterService";

const ProfileScreen = () => {
  const [character, setCharacter] = React.useState<Character | null>(null);
  const navigation = useNavigation();

  const getCharacter = async () => {
    const character: Character | null = await loadCharacter();
    setCharacter(character);
  };

  React.useEffect(() => {
    getCharacter();
  }, []);
  return (
    <BackgroundImage>
      <View style={styles.container}>
        {character && (
          <View>
            <Text>{character.name}</Text>
            <Text>{character.race}</Text>
          </View>
        )}
        <View style={{ backgroundColor: "white", padding: 30 }}>
          <Button onPress={() => navigation.navigate("Home")} title="takas" />
        </View>
      </View>
    </BackgroundImage>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
