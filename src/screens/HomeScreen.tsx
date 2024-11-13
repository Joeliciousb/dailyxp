import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
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
import theme from "../utils/theme";

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

  const handleQuestAccept = () => {
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
        gold: character.gold + quest.gold,
        questsCompleted: ++character.questsCompleted,
      };

      setCharacter(updatedCharacter);
    }
    setAcceptedQuests(updatedArray);
    saveAcceptedQuests(updatedArray);
  };

  const handleQuestAbandon = (id: number) => {
    const updatedArray = acceptedQuests.filter(
      (currentQuest) => id != currentQuest.id
    );
    setAcceptedQuests(updatedArray);
    saveAcceptedQuests(updatedArray);
  };

  return (
    <BackgroundImage>
      <SafeAreaView style={styles.container}>
        <AppBar />
        <View style={styles.scrollContainer}>
          <View style={styles.grid}>
            <Text>Accepted dailies</Text>
            {acceptedQuests.map((quest, index) => (
              <AcceptedQuestCard
                key={index}
                quest={quest}
                handleQuestComplete={handleQuestComplete}
                handleQuestAbandon={handleQuestAbandon}
              />
            ))}
          </View>
          <ScrollView contentContainerStyle={styles.grid}>
            <Text>Available dailies</Text>
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
          handleAcceptQuest={handleQuestAccept}
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
    padding: theme.spacing.small,
  },
});
