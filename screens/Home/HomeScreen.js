import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Categories from "../../components/Categories";
import Restaurants from "../../components/Restaurants";
import { COLORS } from "../../constants/COLORS";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFF"} />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Categories />
        <Text style={styles.header}>Top Picks in Your neighbourhood</Text>
        <Restaurants />
        <Text style={styles.header}>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
