import { ImageBackground, View } from "react-native";

const BackgroundImage = ({ children }: { children: JSX.Element }) => {
  return (
    <View>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/images/thunderbluff_board.jpg")}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundImage;