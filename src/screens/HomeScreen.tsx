import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import QuestModal from "../components/QuestModal";
import BackgroundImage from "./BackgroundImage";
import QuestCard from "../components/QuestCard";
import questData from "../assets/quests/initialQuests.json";
import AcceptedQuestCard from "../components/AcceptedQuestCard";
import {
  loadAcceptedQuests,
  saveAcceptedQuests,
} from "../services/questService";
import { Quest } from "../interface/types";
import { useCharacterContext } from "../services/CharacterContext";

const HomeScreen = () => {
  const [quests, setQuests] = React.useState<Quest[]>([]);
  const [acceptedQuests, setAcceptedQuests] = React.useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = React.useState<Quest | null>(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const { character, setCharacter } = useCharacterContext();

  React.useEffect(() => {
    setQuests(questData.initialQuests);

    const fetchAcceptedQuests = async () => {
      const loadedQuests = await loadAcceptedQuests();
      if (loadedQuests) {
        setAcceptedQuests(loadedQuests);
      }
    };

    fetchAcceptedQuests();
  }, []);

  const handleQuestPress = (quest: Quest) => {
    setSelectedQuest(quest);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedQuest(null);
    setModalVisible(false);
  };

  const handleAcceptQuest = () => {
    if (selectedQuest != null) {
      const updatedArray: Quest[] = [...acceptedQuests, selectedQuest];
      setAcceptedQuests(updatedArray);
      saveAcceptedQuests(updatedArray);
      closeModal();
    }
  };

  const handleQuestComplete = async (quest: Quest) => {
    const updatedArray = acceptedQuests.filter(
      (currentQuest) => quest.id != currentQuest.id
    );
    if (character != null) {
      const updatedCharacter = {
        ...character,
        experience: character.experience + quest.experience,
      };

      setCharacter(updatedCharacter);
    }
    setAcceptedQuests(updatedArray);
    saveAcceptedQuests(updatedArray);
  };

  return (
    <BackgroundImage>
      <SafeAreaView style={styles.container}>
        <AppBar />
        <View style={styles.scrollContainer}>
          <View>
            {acceptedQuests.map((quest, index) => (
              <AcceptedQuestCard
                key={index}
                quest={quest}
                handleQuestComplete={handleQuestComplete}
              />
            ))}
          </View>
          <ScrollView contentContainerStyle={styles.grid}>
            {quests.map((quest, index) => (
              <QuestCard
                key={index}
                quest={quest}
                handleQuestPress={handleQuestPress}
              />
            ))}
          </ScrollView>
        </View>
        <QuestModal
          visible={modalVisible}
          onClose={closeModal}
          quest={selectedQuest}
          handleAcceptQuest={handleAcceptQuest}
        />
      </SafeAreaView>
    </BackgroundImage>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  scrollContainer: {
    flex: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
});
