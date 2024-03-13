import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import { COLORS } from "../constants/COLORS";
import { Link, useNavigation } from "@react-navigation/native";

const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.Search}>
      <View style={styles.containerInput}>
        <Ionicons name="search-outline" size={20} color={COLORS.medium} />
        <TextInput
          placeholder="Restaurants, groceries, dishes"
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("(modal)/filter")}>
        <Ionicons name="options-outline" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15,
    gap: 20,
  },
  containerInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.grey,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    paddingLeft: 8,
    color: COLORS.medium,
  },
});

export default SearchBar;
