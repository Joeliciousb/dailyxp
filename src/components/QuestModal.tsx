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

type QuestModalProps = {
  visible: boolean;
  onClose: () => void;
  quest: Quest | null;
};

const QuestModal = ({ visible, onClose, quest }: QuestModalProps) => {
  if (!quest) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.textQuestGiver}>{quest.questGiver}</Text>
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
              <Text>{quest.experience} XP</Text>
            </ScrollView>
          </LinearGradient>
          <View style={styles.buttonContainer}>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    padding: 16,
    width: "80%",
    height: "80%",
  },
  questContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    overflow: "hidden",
    flex: 1,
  },
  textQuestGiver: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 8,
  },
  textBody: {
    fontSize: 16,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  closeButton: {
    backgroundColor: theme.colors.buttonRed,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 14,
  },
});
