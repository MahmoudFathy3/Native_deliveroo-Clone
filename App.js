import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./Stack/Stack";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <>
      <StatusBar stlye="auto" />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;
