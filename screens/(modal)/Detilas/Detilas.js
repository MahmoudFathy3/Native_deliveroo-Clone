import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  ScrollView,
} from "react-native";
import ParallaxScrollView from "../../../components/ParallexScrollView";
import { COLORS } from "../../../constants/COLORS";
import { Ionicons, Feather } from "react-native-vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Detilas = ({ route, navigation }) => {
  const { name, distance, duration, img, rating, ratings, tages, about, food } =
    route.params?.details;

  const [segmentActive, setSegmentActive] = useState(0);
  const segmentOpacity = useSharedValue(0);

  const DATA = food?.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const handlerActiveSegment = (index) => {
    setSegmentActive(index);
  };

  const animtionStyles = useAnimatedStyle(() => ({
    opacity: segmentOpacity.value,
  }));

  const onScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 200) {
      segmentOpacity.value = withTiming(1);
    } else {
      segmentOpacity.value = withTiming(0);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: COLORS.primary,
      headerLeft: () => (
        <TouchableOpacity
          style={[styles.icons, { marginStart: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.barRight}>
          <TouchableOpacity>
            <Feather
              name="upload"
              size={20}
              color={COLORS.primary}
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={20}
              color={COLORS.primary}
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <>
      <ParallaxScrollView
        onScroll={onScroll}
        parallaxHeaderHeight={250}
        backgroundColor={COLORS.primary}
        contentBackgroundColor={"#fff"}
        renderBackground={() => <Image source={img} style={styles.img} />}
        stickyHeaderHeight={90}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.StickyHeader}>
            <Text style={styles.StickyHeaderText}>{name}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      >
        <View style={styles.Container}>
          <Text style={styles.NameText}>{name}</Text>
          <Text style={styles.description}>
            {`${duration} min`} {"• "}
            {tages.map(
              (tage, index) =>
                `${tage}${index < tages.length - 1 ? " • " : " "}`
            )}
          </Text>
          <Text style={styles.about}>{about}</Text>
          <SectionList
            sections={DATA}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={styles.Card}
                onPress={() =>
                  navigation.navigate("(modal)/single", {
                    item,
                  })
                }
              >
                <View style={styles.cardInfo}>
                  <Text style={styles.CardText}>{item.name}</Text>
                  <Text style={styles.CardDesc}>{item.info}</Text>
                  <Text style={{ color: COLORS.medium }}>{item.Price}$</Text>
                </View>
                <Image source={item.img} style={styles.imgCard} />
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeaderText}>{title}</Text>
            )}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
          />
        </View>
      </ParallaxScrollView>

      <Animated.View style={[styles.Stickysegments, animtionStyles]}>
        <View style={styles.SegmentShadow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentSrollView}
          >
            {DATA.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.segmentList,
                  index === segmentActive && styles.segmentListActive,
                ]}
                onPress={() => handlerActiveSegment(index)}
              >
                <Text
                  style={[
                    styles.SegmentsText,
                    index === segmentActive && styles.segmentActiveText,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 25,
  },
  barRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginEnd: 10,
  },
  StickyHeader: {
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  StickyHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    marginEnd: 30,
    paddingBottom: 20,
  },
  NameText: {
    paddingHorizontal: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
  },
  description: {
    paddingHorizontal: 20,
    color: COLORS.medium,
    fontSize: 14,
    lineHeight: 23,
  },
  about: {
    paddingHorizontal: 20,
    color: COLORS.medium,
    fontSize: 15,
    marginVertical: 15,
    lineHeight: 20,
  },
  Card: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardInfo: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 5,
  },
  CardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  CardDesc: {
    color: COLORS.medium,
    lineHeight: 20,
    marginRight: 5,
  },
  imgCard: {
    width: 100,
    height: 100,
  },
  sectionHeaderText: {
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  Stickysegments: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 80,
    height: 50,
    backgroundColor: "#fff",
    paddingBottom: 5,
    overflow: "hidden",
    borderBottomColor: COLORS.medium,
    borderBottomWidth: 0.5,
  },
  SegmentShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  segmentList: {
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    // marginTop: 4,
  },
  segmentListActive: {
    backgroundColor: COLORS.primary,
  },
  SegmentsText: {
    color: COLORS.primary,
  },
  segmentActiveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  segmentSrollView: {
    paddingHorizontal: 15,
    alignItems: "center",
    gap: 10,
    paddingBottom: 4,
  },
});

export default Detilas;
