import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../utils/theme";
import { Quest } from "../interface/types";

type QuestModalProps = {
  visible: boolean;
  onClose: () => void;
  quest: Quest | null;
  handleAcceptQuest: () => void;
};

const QuestModal = ({
  visible,
  onClose,
  quest,
  handleAcceptQuest,
}: QuestModalProps) => {
  if (!quest) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.textQuestGiver}>{quest.questGiver.name}</Text>
          <LinearGradient
            style={styles.questContainer}
            colors={[
              "#B07930",
              "#EBAF61",
              "#EFBF80",
              "#E3A759",
              "#E4AE64",
              "#B07930",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ScrollView>
              <Text style={styles.textTitle}>{quest.title}</Text>
              <Text style={styles.textBody}>{quest.description}</Text>
              <Text style={styles.textBody}>{quest.task}</Text>
              <Text style={styles.textBody}>{quest.experience} XP</Text>
            </ScrollView>
          </LinearGradient>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleAcceptQuest}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QuestModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: theme.colors.opacity_50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    padding: theme.spacing.medium,
    width: "80%",
    height: "70%",
  },
  questContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    overflow: "hidden",
    flex: 1,
  },
  textQuestGiver: {
    fontSize: theme.fonts.size.large,
    fontWeight: "bold",
    color: theme.fonts.color.white,
    marginBottom: theme.spacing.small,
  },
  textTitle: {
    fontSize: theme.fonts.size.xLarge,
    fontWeight: "bold",
    padding: theme.spacing.small,
  },
  textBody: {
    fontSize: theme.fonts.size.medium,
    padding: theme.spacing.small,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.medium,
  },
  closeButton: {
    backgroundColor: theme.colors.buttonRed,
    borderRadius: 4,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  buttonText: {
    color: theme.fonts.color.gold,
    fontSize: theme.fonts.size.small,
  },
});
