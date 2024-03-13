import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { COLORS } from "../../constants/COLORS";
import { Ionicons } from "react-native-vector-icons";

const LocationSearch = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 30.0136,
    longitude: 31.2081,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data, details);
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <Ionicons
            name="search-outline"
            size={20}
            color={COLORS.medium}
            style={{ alignSelf: "center", paddingLeft: 8 }}
          />
        )}
        styles={{
          container: {
            flex: 0,
            backgroundColor: "white",
          },
          textInputContainer: {
            marginBottom: 8,
            marginHorizontal: 10,
            backgroundColor: COLORS.grey,
            borderColor: COLORS.grey,
            borderWidth: 1,
            borderRadius: 10,
            alignItems: "center",
          },
          textInput: {
            color: COLORS.medium,
            backgroundColor: COLORS.grey,
          },
        }}
      />

      <MapView
        showsUserLocation={true}
        mapType={Platform.OS === "android" ? "terrain" : "mutedStandard"}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        region={location}
        style={styles.maps}
      />
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 17,
    color: "#fff",
  },
});

export default LocationSearch;
