import { ImageBackground, View } from "react-native";

const BackgroundImage = ({ children }: { children: JSX.Element }) => {
  return (
    <View style={{ padding: 8 }}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/images/stormwind_board.jpg")}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundImage;
