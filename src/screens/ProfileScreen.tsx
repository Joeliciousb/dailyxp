import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import BackgroundImage from "./BackgroundImage";
import { Ionicons } from "@expo/vector-icons";
import { useCharacterContext } from "../services/CharacterContext";
import theme from "../utils/theme";
import CharacterInfo from "../components/CharacterInfo";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interface/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ProfileScreen = () => {
  const { character } = useCharacterContext();
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
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings" size={30} color="white" />
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
            <View style={styles.inventoryContainer}>
              <Text style={styles.inventoryText}>Inventory Items:</Text>
              <Text style={styles.inventoryText}>- Sword</Text>
              <Text style={styles.inventoryText}>- Shield</Text>
              <Text style={styles.inventoryText}>- Potion</Text>
            </View>
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
});
