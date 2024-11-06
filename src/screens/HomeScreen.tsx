import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import QuestModal from "../components/QuestModal";
import { getQuests } from "../db/questModel";
import BackgroundImage from "./BackgroundImage";
import QuestCard from "../components/QuestCard";

const HomeScreen = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  React.useEffect(() => {
    getAllQuests();
  }, []);

  const getAllQuests = async () => {
    const allQuests = await getQuests();
    if (allQuests) {
      setQuests(allQuests);
    }
  };

  const handleQuestPress = (quest: Quest) => {
    setSelectedQuest(quest);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedQuest(null);
    setModalVisible(false);
  };

  return (
    <BackgroundImage>
      <SafeAreaView style={styles.container}>
        <AppBar />
        <View style={styles.scrollContainer}>
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
