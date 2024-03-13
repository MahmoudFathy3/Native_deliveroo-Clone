import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { COLORS } from "../../../constants/COLORS";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

const Single = ({ route, navigation }) => {
  const { item } = route.params;
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-outline" color={COLORS.primary} size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleCountMinus = () => {
    if (count === 0) return;
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        entering={FadeInUp.duration(500).delay(250)}
        source={item.img}
        style={styles.Img}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.info}>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(300)}
            style={styles.Text}
          >
            {item.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInRight.duration(500).delay(300)}
            style={styles.Desc}
          >
            {item.info}
          </Animated.Text>
          <Text style={styles.Price}>{item.Price}$</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerCount}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setCount(count + 1)}
          >
            <AntDesign name="plus" size={25} color={COLORS.lightGrey} />
          </TouchableOpacity>
          <Text>{count}</Text>
          <TouchableOpacity style={styles.circle} onPress={handleCountMinus}>
            <AntDesign name="minus" size={25} color={COLORS.lightGrey} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  Img: {
    width: "100%",
    height: 280,
  },
  info: {
    margin: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  Text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  Desc: {
    color: COLORS.medium,
    fontSize: 15,
  },
  Price: {
    color: COLORS.medium,
    fontSize: 15,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  footerButtonText: {
    color: COLORS.lightGrey,
    fontWeight: "bold",
    fontSize: 17,
  },
  footerCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Single;
