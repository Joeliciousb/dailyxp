import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import QuestModal from "../components/QuestModal";
import BackgroundImage from "./BackgroundImage";
import QuestCard from "../components/QuestCard";
import questData from "../assets/quests/initialQuests.json";
import { deleteCharacter } from "../services/characterService";

const HomeScreen = () => {
  const [quests, setQuests] = React.useState<Quest[]>([]);
  const [acceptedQuests, setAcceptedQuests] = React.useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = React.useState<Quest | null>(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    setQuests(questData.initialQuests);
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
      closeModal();
    }
  };

  return (
    <BackgroundImage>
      <SafeAreaView style={styles.container}>
        <AppBar />
        <View style={styles.scrollContainer}>
          <View>
            {acceptedQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                handleQuestPress={handleQuestPress}
              />
            ))}
          </View>
          <ScrollView contentContainerStyle={styles.grid}>
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
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
