import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/components/screens/HomeScreen";
import React from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <HomeScreen />
    </>
  );
}
/*
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "lightgrey",
              paddingTop: 10,
            },
            tabBarLabel: "",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: "home" | "settings" | "user" = "home";
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Profile") {
                iconName = "user";
              }
              return <Feather name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      */
