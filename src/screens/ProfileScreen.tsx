import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import BackgroundImage from "./BackgroundImage";
import { useNavigation } from "@react-navigation/native";
import { calculateLevel } from "../utils/levelCalculations";
import { Ionicons } from "@expo/vector-icons";
import { useCharacterContext } from "../services/CharacterContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import theme from "../utils/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interface/types";
import { getRaceImage } from "../utils/imageMappings";

const ProfileScreen = () => {
  const { character } = useCharacterContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const source = getRaceImage(character!.race, character!.bodyType);

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>
            <Image source={source} style={styles.image} />
            {character && (
              <View style={{ padding: theme.spacing.medium }}>
                <Text style={styles.characterName}>{character.name},</Text>
                <Text
                  style={styles.character_text_body}
                >{`Level ${calculateLevel(character.experience)} ${
                  character.race
                }`}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.character_text_body}>
                    Gold: {character.gold}
                  </Text>
                  <FontAwesome6
                    name="coins"
                    size={14}
                    color={theme.fonts.color.gold}
                  />
                </View>
                <Text style={styles.character_text_body}>
                  Quests Completed: {character.questsCompleted}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.large,
  },
  appBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing.large,
    borderRadius: 8,
  },
  profileInfoContainer: {
    flex: 4,
  },
  profileInfo: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.medium,
    borderRadius: 8,
  },
  characterName: {
    fontSize: theme.fonts.size.xLarge,
    fontWeight: "bold",
    marginBottom: theme.spacing.small,
    color: theme.fonts.color.white,
  },
  character_text_body: {
    fontSize: theme.fonts.size.large,
    color: theme.fonts.color.white,
    marginRight: theme.spacing.small,
  },
});
