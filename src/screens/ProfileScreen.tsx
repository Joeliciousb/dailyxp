import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Text from "../components/Text";
import BackgroundImage from "./BackgroundImage";
import { Ionicons } from "@expo/vector-icons";
import { useCharacterContext } from "../services/CharacterContext";
import theme from "../utils/theme";
import CharacterInfo from "../components/CharacterInfo";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interface/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getImage } from "../utils/imageMappings";
import Button from "../components/Button";
import { handleEquipItem } from "../utils/handleEquipItem";

const ProfileScreen = () => {
  const { character, setCharacter } = useCharacterContext();
  const [activeTab, setActiveTab] = useState("Character");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Character" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab("Character")}
          >
            <Text style={styles.tabText}>Character Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Inventory" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab("Inventory")}
          >
            <Text style={styles.tabText}>Inventory</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === "Character" ? (
            <CharacterInfo character={character!} />
          ) : (
            <ScrollView style={styles.inventoryContainer}>
              {character!.inventory.map((item) => {
                const source = getImage(item.type, item.id);
                return (
                  <View key={item.id} style={styles.itemCard}>
                    <Image
                      source={source}
                      style={{ height: 150, width: "100%" }}
                    />
                    <View style={styles.itemCardInformation}>
                      <Text style={styles.inventoryText}>{item.name}</Text>
                      <Button
                        disabled={item.equipped}
                        title="Equip"
                        onPress={() =>
                          handleEquipItem({ item, character, setCharacter })
                        }
                      />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 4,
    marginTop: 40,
    backgroundColor: theme.colors.secondary,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    color: theme.fonts.color.white,
    fontSize: theme.fonts.size.medium,
  },
  content: {
    flex: 1,
  },
  inventoryContainer: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.medium,
  },
  inventoryText: {
    color: theme.fonts.color.white,
    fontSize: theme.fonts.size.medium,
  },
  itemCard: { padding: theme.spacing.medium },
  itemCardInformation: {
    flexDirection: "row",
    marginVertical: theme.spacing.medium,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
