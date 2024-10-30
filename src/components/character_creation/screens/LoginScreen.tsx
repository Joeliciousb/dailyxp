import { TextInput, View } from "react-native";

const LoginScreen = () => {
  return (
    <>
      <View>
        <TextInput onChangeText={() => console.log("kaka")}></TextInput>
      </View>
    </>
  );
};

export default LoginScreen;
