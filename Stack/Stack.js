import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "react-native-vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import CustomHeader from "../components/CustomHeader";
import Filter from "../screens/(modal)/Filter";
import { COLORS } from "../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import LocationSearch from "../screens/(modal)/location-search";
import Detilas from "../screens/(modal)/Detilas/Detilas";
import Single from "../screens/(modal)/Detilas/Single";

const Stack = createStackNavigator();

const StackNavigation = () => {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => <CustomHeader />,
            }}
          />
          <Stack.Group
            screenOptions={{
              presentation: "modal",
            }}
          >
            <Stack.Screen
              name="(modal)/filter"
              component={Filter}
              options={{
                // presentation: "modal",
                title: "Filter",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: COLORS.lightGrey,
                },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="close-outline"
                      size={28}
                      color={COLORS.primary}
                      style={{ marginLeft: 20 }}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="(modal)/location-search"
              component={LocationSearch}
              options={{
                // presentation: "modal",
                title: "Search Location",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="close-outline"
                      size={28}
                      color={COLORS.primary}
                      style={{ marginLeft: 20 }}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="(modal)/details" component={Detilas} />
            <Stack.Screen
              name="(modal)/single"
              component={Single}
              options={{
                headerTitle: "",
                headerShadowVisible: false,
                headerTransparent: true,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default StackNavigation;
