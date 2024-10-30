import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/HomeScreen";
import React from "react";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <HomeScreen />
    </>
  );
}
