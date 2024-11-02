import React from "react";
import { Button, StyleSheet, View } from "react-native";
import BackgroundImage from "./BackgroundImage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate("Home")} title="takas" />
        <View style={{ backgroundColor: "blue", padding: 30 }}></View>
      </View>
    </BackgroundImage>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
