import React from "react";
import { StyleSheet, View } from "react-native";
import BackgroundImage from "./BackgroundImage";

const ProfileScreen = () => {
  return (
    <BackgroundImage>
      <View style={styles.container}>
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
