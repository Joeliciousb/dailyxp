import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import AppBar from "../components/AppBar";
import QuestModal from "../components/QuestModal";
import BackgroundImage from "./BackgroundImage";
import QuestCard from "../components/QuestCard";
import AcceptedQuestCard from "../components/AcceptedQuestCard";
import {
  loadDailyQuests,
  ifNewDaySelectRandomDailyQuests,
  completeQuest,
} from "../services/questService";
import { Quest } from "../interface/types";
import { useCharacterContext } from "../services/CharacterContext";
import theme from "../utils/theme";
import Snackbar from "../components/Snackbar";

const HomeScreen = () => {
  const [quests, setQuests] = React.useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = React.useState<Quest | null>(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);

  const { character, setCharacter } = useCharacterContext();

  React.useEffect(() => {
    const fetchDailies = async () => {
      await ifNewDaySelectRandomDailyQuests();
      const dailyQuests = await loadDailyQuests();
      if (dailyQuests) {
        setQuests(dailyQuests);
      }
    };

    fetchDailies();
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
      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === selectedQuest.id
            ? { ...quest, status: "accepted" }
            : quest
        )
      );
      closeModal();
    }
  };

  const handleQuestComplete = (quest: Quest) => {
    if (character) {
      const updatedCharacter = {
        ...character,
        experience: character.experience + quest.experience,
        gold: character.gold + quest.gold,
        questsCompleted: character.questsCompleted + 1,
      };
      setCharacter(updatedCharacter);
    }
    completeQuest(quest.id);
    setQuests((prevQuests) =>
      prevQuests.map((q) =>
        q.id === quest.id ? { ...q, status: "completed" } : q
      )
    );
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const handleQuestAbandon = (id: number) => {
    setQuests((prevQuests) =>
      prevQuests.map((q) => (q.id === id ? { ...q, status: "available" } : q))
    );
  };

  const availableQuests = quests.filter(
    (quest) => quest.status === "available"
  );
  const acceptedQuests = quests.filter((quest) => quest.status === "accepted");

  return (
    <BackgroundImage>
      <SafeAreaView style={styles.container}>
        <View style={{ height: "20%" }}>
          <AppBar />
        </View>
        <ScrollView contentContainerStyle={styles.grid}>
          {acceptedQuests.length > 0 && (
            <Text style={styles.headlineText}>Accepted dailies</Text>
          )}
          {acceptedQuests.map((quest, index) => (
            <AcceptedQuestCard
              key={index}
              quest={quest}
              handleQuestComplete={handleQuestComplete}
              handleQuestAbandon={handleQuestAbandon}
            />
          ))}
          <Text style={styles.headlineText}>Available dailies</Text>
          {availableQuests.map((quest, index) => (
            <QuestCard
              key={index}
              quest={quest}
              handleQuestPress={handleQuestPress}
            />
          ))}
        </ScrollView>
        <QuestModal
          visible={modalVisible}
          onClose={closeModal}
          quest={selectedQuest}
          handleAcceptQuest={handleQuestAccept}
        />
        {!snackbarVisible && <Snackbar message="Thank you adventurer!" />}
      </SafeAreaView>
    </BackgroundImage>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headlineText: {
    width: "70%",
    alignSelf: "center",
    color: theme.fonts.color.white,
    fontSize: theme.fonts.size.xLarge,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: theme.spacing.small,
  },
});
