import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../utils/theme";
import { Quest } from "../interface/types";
import Button from "./Button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
            <Animated.View
              key={"questContainer"}
              entering={FadeIn.duration(2000)}
            >
              <ScrollView>
                <Text style={styles.textTitle}>{quest.title}</Text>
                <Text style={styles.textBody}>{quest.description}</Text>
                <Text style={styles.textBody}>{quest.task}</Text>
                <Text style={styles.textBody}>Rewards: </Text>
                <Text style={styles.textBody}>{quest.experience} XP</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 8,
                      fontSize: theme.fonts.size.medium,
                    }}
                  >
                    {quest.gold}
                  </Text>
                  <FontAwesome6
                    name="coins"
                    size={12}
                    color={theme.fonts.color.gold}
                  />
                </View>
              </ScrollView>
            </Animated.View>
          </LinearGradient>
          <View style={styles.buttonContainer}>
            <Button onPress={handleAcceptQuest} title="Accept" />
            <Button onPress={onClose} title="Close" />
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
    height: "50%",
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
});
