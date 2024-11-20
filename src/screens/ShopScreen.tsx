import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../interface/types";
import BackgroundImage from "./BackgroundImage";
import { Ionicons } from "@expo/vector-icons";
import theme from "../utils/theme";

const ShopScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <BackgroundImage>
      <View>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView></ScrollView>
      </View>
    </BackgroundImage>
  );
};
export default ShopScreen;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    padding: theme.spacing.large,
  },
});
