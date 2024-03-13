import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { COLORS } from "../constants/COLORS";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "react-native-vector-icons";

const BottomSheets = React.forwardRef((props, ref) => {
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ["50%"], []);

  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: COLORS.lightGrey,
        borderRadius: 0,
      }}
      handleIndicatorStyle={{ display: "none" }}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.selectTitle} activeOpacity={0.5}>
          <TouchableOpacity style={styles.active}>
            <Text style={styles.TextActive}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactive} activeOpacity={0.5}>
            <Text style={styles.TextInActive}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Your Location</Text>
        <TouchableOpacity
          onPress={() => {
            dismiss();
            navigation.navigate("(modal)/location-search");
          }}
        >
          <View style={styles.item}>
            <Ionicons name="location-outline" color={COLORS.medium} size={20} />
            <Text style={{ flex: 1 }}>Current Location</Text>
            <FontAwesome5 name="angle-right" color={COLORS.primary} size={20} />
          </View>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Arrival time</Text>
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
              name="stopwatch-outline"
              color={COLORS.medium}
              size={20}
            />
            <Text style={{ flex: 1 }}>Now</Text>
            <FontAwesome5 name="angle-right" color={COLORS.primary} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={() => dismiss()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  selectTitle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginBottom: 10,
  },
  active: {
    backgroundColor: COLORS.primary,
    padding: 4,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  TextActive: {
    color: COLORS.lightGrey,
    fontWeight: "700",
  },
  inactive: {
    padding: 4,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  TextInActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 10,
    paddingVertical: 15,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default BottomSheets;
