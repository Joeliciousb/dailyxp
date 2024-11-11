import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/HomeScreen";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./src/screens/ProfileScreen";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import theme from "./src/utils/theme";
import CreateCharacterScreen from "./src/screens/CreateCharacterScreen";
import { characterExists } from "./src/services/characterService";

export default function App() {
  const [initialRoute, setInitialRoute] = React.useState<string | null>(null);
  const Stack = createNativeStackNavigator();

  React.useEffect(() => {
    const initializeApp = async () => {
      try {
        const result = await characterExists();
        setInitialRoute(result ? "Home" : "CreateCharacter");
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };
    initializeApp();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="CreateCharacter"
          component={CreateCharacterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
