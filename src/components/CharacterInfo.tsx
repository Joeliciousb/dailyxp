import { StyleSheet, View, Image } from "react-native";
import Text from "./Text";
import { Character } from "../interface/types";
import theme from "../utils/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { getImage } from "../utils/imageMappings";
import { calculateLevel } from "../utils/levelCalculations";

type CharacterInfoProps = {
  character: Character;
};

const CharacterInfo = ({ character }: CharacterInfoProps) => {
  const source = getImage(character.race, character!.bodyType);

  const equippedTitle = character.inventory.find(
    (item) => item.type === "title" && item.equipped
  );

  const displayedTitle = equippedTitle
    ? equippedTitle.name.split(",")[1].trim()
    : "";

  return (
    <View style={styles.profileInfoContainer}>
      <View style={styles.profileInfoContainer}>
        <Image source={source} style={styles.image} />
        {character && (
          <View
            style={{
              paddingHorizontal: theme.spacing.medium,
              paddingBottom: theme.spacing.small,
            }}
          >
            <Text style={styles.characterName}>
              {character.name} {displayedTitle},
            </Text>
            <Text style={styles.character_text_body}>{`Level ${calculateLevel(
              character.experience
            )} ${character.race}`}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
  );
};

export default CharacterInfo;

const styles = StyleSheet.create({
  profileInfoContainer: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.small,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing.large,
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
