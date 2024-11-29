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
import ShopScreen from "./src/screens/ShopScreen";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { character, loading } = useCharacterContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
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
      <Stack.Screen name="Shop" component={ShopScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  useFonts({
    LifeCraft: require("./src/assets/fonts/LifeCraft_Font.ttf"),
  });
  return (
    <CharacterProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </CharacterProvider>
  );
}
