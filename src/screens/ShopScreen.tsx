import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import Text from "../components/Text";
import { Item, RootStackParamList } from "../interface/types";
import BackgroundImage from "./BackgroundImage";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import theme from "../utils/theme";
import { useCharacterContext } from "../services/CharacterContext";
import { filterItemsNotInInventory } from "../utils/filterItemsNotInInventory";
import Button from "../components/Button";
import itemsData from "../assets/data/shopItems.json";
import { getImage } from "../utils/imageMappings";
import Snackbar from "../components/Snackbar";
import { handleEquipItem } from "../utils/handleEquipItem";

type ItemModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: Item;
  handlePurchaseItem: (selectedItem: Item) => void;
  characterGold: number;
};

const ItemModal = ({
  isModalVisible,
  setIsModalVisible,
  selectedItem,
  handlePurchaseItem,
  characterGold,
}: ItemModalProps) => {
  const source = getImage(selectedItem.type, selectedItem.id);
  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image source={source} style={styles.modalImage} />
          <Text style={styles.itemName}>{selectedItem.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.characterGoldText}>{selectedItem.price}</Text>
            <FontAwesome6
              name="coins"
              size={20}
              color={theme.fonts.color.gold}
            />
          </View>
          <View style={styles.modalActions}>
            <Button onPress={() => setIsModalVisible(false)} title="Cancel" />
            <Button
              disabled={selectedItem.price > characterGold}
              onPress={() => handlePurchaseItem(selectedItem)}
              title="Purchase"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ShopScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { character, setCharacter } = useCharacterContext();

  const availableItems = filterItemsNotInInventory(
    itemsData.items,
    character!.inventory
  );

  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);

  const handlePurchaseItem = (item: Item) => {
    if (character && character.gold >= item.price) {
      const updatedInventory = [...character.inventory, item];
      const updatedCharacter = {
        ...character,
        inventory: updatedInventory,
        gold: character.gold - item.price,
      };
      setCharacter(updatedCharacter);
      setIsModalVisible(false);

      setIsSnackbarVisible(true);
      setTimeout(() => {
        setIsSnackbarVisible(false);
      }, 4000);
    }
  };

  const renderItem = ({ item }: { item: Item }) => {
    const source = getImage(item.type, item.id);
    return (
      <TouchableOpacity
        style={styles.itemCard}
        onPress={() => {
          setSelectedItem(item);
          setIsModalVisible(true);
        }}
      >
        <Image source={source} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={{ flexDirection: "row", marginVertical: 4 }}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <FontAwesome6 name="coins" size={20} color={theme.fonts.color.gold} />
        </View>
      </TouchableOpacity>
    );
  };

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
        {availableItems.length > 0 ? (
          <FlatList
            data={availableItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={styles.list}
          />
        ) : (
          // TODO
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.fonts.color.white,
                fontSize: theme.fonts.size.xLarge,
              }}
            >
              Shop is empty for now!
            </Text>
          </View>
        )}

        {
          // BUTTON TO MAKE MONEY
        }
        <TouchableOpacity
          onPress={() =>
            setCharacter({ ...character!, gold: character!.gold + 100 })
          }
        >
          <View
            style={{
              padding: 30,
              width: "20%",
              backgroundColor: theme.fonts.color.gold,
            }}
          ></View>
        </TouchableOpacity>

        {selectedItem && (
          <ItemModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            selectedItem={selectedItem}
            handlePurchaseItem={handlePurchaseItem}
            characterGold={character!.gold}
          />
        )}
        {isSnackbarVisible && (
          <Snackbar
            message="Purchase ok!"
            actionText="Equip"
            onActionPress={() =>
              handleEquipItem({
                item: selectedItem,
                character: character,
                setCharacter: setCharacter,
              })
            }
          />
        )}
      </View>
    </BackgroundImage>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    padding: 24,
  },
  characterGoldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  characterGoldText: {
    color: theme.fonts.color.white,
    fontSize: theme.fonts.size.large,
    marginRight: 8,
  },
  list: {
    marginTop: 24,
    paddingBottom: 24,
  },
  itemCard: {
    flex: 1,
    width: "70%",
    backgroundColor: theme.colors.opacity_75,
    marginVertical: 16,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    alignSelf: "center",
  },
  itemImage: {
    width: "95%",
    height: 100,
    marginBottom: 8,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    color: theme.fonts.color.white,
    fontWeight: "bold",
    marginBottom: 8,
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
