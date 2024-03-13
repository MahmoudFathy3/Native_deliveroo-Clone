import { useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { COLORS } from "../constants/COLORS";
import SearchBar from "./SearchBar";
import BottomSheets from "./BottomSheet";

const CustomHeader = () => {
  const bottomSheetRef = useRef(null);

  const OpenModal = () => {
    bottomSheetRef.current?.present();
  };

  const SafeAreaTop =
    Platform.OS === "ios"
      ? { flex: 1 }
      : { paddingTop: StatusBar.currentHeight };

  return (
    <SafeAreaView style={[styles.SafeArea, SafeAreaTop]}>
      <BottomSheets ref={bottomSheetRef} />

      <View style={styles.CustomHeader}>
        <TouchableOpacity onPress={OpenModal}>
          <Image
            source={require("../assets/image/bike.jpg")}
            style={styles.bike}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} onPress={OpenModal}>
          <Text style={styles.titleName}>Deliveroo . Now</Text>
          <View style={styles.wapperInfo}>
            <Text style={styles.Location}>Select Location</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: COLORS.lightGrey, padding: 5 , borderRadius: 25}}>
          <AntDesign name="user" color={COLORS.primary} size={20} />
        </TouchableOpacity>
      </View>

      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea: {
    backgroundColor: "white",
  },
  CustomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    padding: 15,
  },
  bike: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  wapperInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  titleName: {
    color: COLORS.medium,
    fontWeight: "500",
    fontSize: 14,
  },
  Location: {
    fontWeight: "700",
    fontSize: 17,
  },
});

export default CustomHeader;
