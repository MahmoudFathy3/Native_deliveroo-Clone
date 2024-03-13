import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Category } from "../constants/data";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 10,
      }}
    >
      {Category.map((category, index) => {
        return (
          <View key={index} style={styles.categoryCard}>
            <Image source={category.image} style={styles.img} />
            <Text style={styles.categoryText}>{category.text}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  categoryText: {
    fontWeight: "bold",
    fontSize: 13,
    padding: 8,
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});

export default Categories;
