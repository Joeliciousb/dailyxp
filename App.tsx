import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/HomeScreen";
import React from "react";
import { initialize } from "./src/db/db";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./src/screens/ProfileScreen";
import { StyleSheet, View } from "react-native";
import theme from "./src/utils/theme";

export default function App() {
  const Stack = createNativeStackNavigator();

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
