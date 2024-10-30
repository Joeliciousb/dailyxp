import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppBar from "../AppBar";

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#7b0a0a", "#aa1c1c"]}
      style={styles.backgroundContainer}
    >
      <SafeAreaView style={styles.container}>
        <AppBar />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
