import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { Restaurant } from "../constants/data";
import { COLORS } from "../constants/COLORS";
import { useNavigation } from "@react-navigation/native";

const Restaurants = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 10,
      }}
    >
      {Restaurant.map((restaurant) => {
        return (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.test}
            onPress={() =>
              navigation.navigate("(modal)/details", {
                details: restaurant,
              })
            }
          >
            <View style={styles.restaurantCard}>
              <Image
                source={restaurant.img}
                style={{ flex: 1, width: undefined, height: undefined }}
              />
              <View style={styles.restaurantBox}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {restaurant.name}
                </Text>
                <Text style={{ color: COLORS.green }}>
                  {restaurant.rating} {restaurant.ratings}
                </Text>
                <Text style={{ color: COLORS.medium }}>
                  {restaurant.distance}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  test: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  restaurantCard: {
    flex: 1,
  },
  restaurantBox: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    gap: 3,
  },
});

export default Restaurants;
