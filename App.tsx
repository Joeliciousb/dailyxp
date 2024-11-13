import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CreateCharacterScreen from "./src/screens/CreateCharacterScreen";
import {
  useCharacterContext,
  CharacterProvider,
} from "./src/services/CharacterContext";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { character, loading } = useCharacterContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={character ? "Home" : "CreateCharacter"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CreateCharacter" component={CreateCharacterScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <CharacterProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </CharacterProvider>
  );
}
