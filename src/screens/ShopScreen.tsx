import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageSourcePropType,
  Modal,
} from "react-native";
import { Item, RootStackParamList } from "../interface/types";
import BackgroundImage from "./BackgroundImage";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import theme from "../utils/theme";
import { useCharacterContext } from "../services/CharacterContext";
import { filterItemsNotInInventory } from "../utils/filterItemsNotInInventory";
import Button from "../components/Button";

const items: Item[] = [
  {
    id: "1",
    name: "Pandaria wallpaper",
    price: 100,
    imageUrl: require("../assets/images/backgrounds/panda.png"),
  },
  {
    id: "2",
    name: "Northrend wallpaper",
    price: 150,
    imageUrl: require("../assets/images/backgrounds/wrath.png"),
  },
  {
    id: "3",
    name: "Deathwing wallpaper",
    price: 125,
    imageUrl: require("../assets/images/backgrounds/deathwing.png"),
  },
  {
    id: "4",
    name: "Teldrassil wallpaper",
    price: 100,
    imageUrl: require("../assets/images/backgrounds/teldrassil.png"),
  },
  {
    id: "5",
    name: "Character Title, the Insane",
    price: 50,
    imageUrl: require("../assets/images/titles/insane.png"),
  },
  {
    id: "6",
    name: "Character Title, Jenkins",
    price: 50,
    imageUrl: require("../assets/images/titles/jenkins.png"),
  },
  {
    id: "7",
    name: "Character Title, the Patient",
    price: 50,
    imageUrl: require("../assets/images/titles/patient.png"),
  },
];

const ShopScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { character, setCharacter } = useCharacterContext();

  const availableItems = filterItemsNotInInventory(items, character!.inventory);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handlePurchaseItem = (item: Item) => {
    if (character) {
      const updatedInventory = [...character.inventory, item];
      const updatedCharacter = {
        ...character,
        inventory: updatedInventory,
        gold: character.gold - item.price,
      };
      setCharacter(updatedCharacter);
    }
    setIsModalVisible(false);
  };

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      price: number;
      imageUrl: ImageSourcePropType;
    };
  }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => {
        setSelectedItem(item);
        setIsModalVisible(true);
      }}
    >
      <Image source={item.imageUrl} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={{ flexDirection: "row", marginVertical: 4 }}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <FontAwesome6 name="coins" size={20} color={theme.fonts.color.gold} />
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.characterGoldContainer}>
            <Text style={styles.characterGoldText}>{character!.gold}</Text>
            <FontAwesome6
              name="coins"
              size={20}
              color={theme.fonts.color.gold}
            />
          </View>
        </View>
        <FlatList
          data={availableItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity
          onPress={() =>
            setCharacter({ ...character!, gold: character!.gold + 100 })
          }
        >
          <View
            style={{ padding: 30, backgroundColor: theme.fonts.color.gold }}
          ></View>
        </TouchableOpacity>

        {selectedItem && (
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Image
                  source={selectedItem.imageUrl}
                  style={styles.modalImage}
                />
                <Text style={styles.itemName}>{selectedItem.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.characterGoldText}>
                    {selectedItem.price}
                  </Text>
                  <FontAwesome6
                    name="coins"
                    size={20}
                    color={theme.fonts.color.gold}
                  />
                </View>
                <View style={styles.modalActions}>
                  <Button
                    onPress={() => setIsModalVisible(false)}
                    title="Cancel"
                  />
                  <Button
                    onPress={() => handlePurchaseItem(selectedItem)}
                    title="Purchase"
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </BackgroundImage>
  );
};

export default ShopScreen;

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
  characterGoldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  characterGoldText: {
    color: theme.fonts.color.white,
    fontSize: theme.fonts.size.large,
    marginRight: theme.spacing.small,
  },
  list: {
    marginTop: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
  itemCard: {
    flex: 1,
    width: "70%",
    backgroundColor: theme.colors.opacity_75,
    marginVertical: theme.spacing.medium,
    marginHorizontal: theme.spacing.small,
    borderRadius: theme.spacing.small,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.small,
    alignSelf: "center",
  },
  itemImage: {
    width: "95%",
    height: 100,
    marginBottom: theme.spacing.small,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    color: theme.fonts.color.white,
    fontWeight: "bold",
    marginBottom: theme.spacing.small,
  },
  itemPrice: {
    fontSize: 16,
    color: theme.fonts.color.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.opacity_25,
  },
  modalContent: {
    backgroundColor: theme.colors.secondary,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
