import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS } from "../../constants/COLORS";
import category from "../../constants/FilterData.json";
// import FlatItem from "../../components/FlatItem";
import { Ionicons } from "react-native-vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const itemBox = () => {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={COLORS.medium} />
          <Text style={{ flex: 1, fontSize: 14 }}>Sort</Text>
          <Ionicons name="chevron-forward" size={23} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={COLORS.medium} />
          <Text style={{ flex: 1, fontSize: 14 }}>Hygiene rating</Text>
          <Ionicons name="chevron-forward" size={23} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { borderBottomWidth: 0 }]}>
          <Ionicons name="pricetag-outline" size={20} color={COLORS.medium} />
          <Text style={{ flex: 1, fontSize: 14 }}>Offers</Text>
          <Ionicons name="chevron-forward" size={23} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { borderBottomWidth: 0 }]}>
          <Ionicons name="nutrition-outline" size={20} color={COLORS.medium} />
          <Text style={{ flex: 1, fontSize: 14 }}>Dietary</Text>
          <Ionicons name="chevron-forward" size={23} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Categories</Text>
    </>
  );
};

const Filter = ({ navigation }) => {
  const [items, setItems] = useState(category);
  const [selected, setSelected] = useState([]);
  const flexWidth = useSharedValue(0);
  const scaleText = useSharedValue(0);

  const handlerClearAll = () => {
    const updateItems = items.map((item) => {
      item.checked = false;
      return item;
    });

    setItems(updateItems);
  };

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scaleText.value = withTiming(newSelected ? 1 : 0);
    }
    setSelected(selectedItems);
  }, [items]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });

  const animationText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleText.value }],
    };
  });

  const renderItems = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={{ flex: 1 }}>
          {item.name} ({item.count})
        </Text>
        <BouncyCheckbox
          isChecked={items[index].checked}
          fillColor={COLORS.primary}
          unfillColor="#fff"
          disableBuiltInState
          iconStyle={{
            borderColor: COLORS.primary,
            borderRadius: 4,
            borderWidth: 2,
          }}
          innerIconStyle={{ borderColor: COLORS.primary, borderRadius: 4 }}
          onPress={(e) => {
            const isChecked = items[index].checked;

            const updateItem = items.map((item) => {
              if (item.name === items[index].name) {
                item.checked = !isChecked;
              }
              return item;
            });
            setItems(updateItem);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={renderItems}
        ListHeaderComponent={itemBox}
      />
      <View style={{ height: 85 }} />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[animationStyle, styles.outlineButton]}>
            <TouchableOpacity onPress={handlerClearAll}>
              <Animated.Text style={[animationText, styles.outlineTextButton]}>
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.TextButton}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    padding: 25,
    paddingTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    height: 100,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  outlineButton: {
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
  },
  outlineTextButton: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  fullButton: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    height: 56,
  },
  TextButton: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.lightGrey,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: 8,
    marginBottom: 3,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 15,
  },
  row: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 8,
    paddingVertical: 14,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
});

export default Filter;
