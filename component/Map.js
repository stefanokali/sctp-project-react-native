import React, { useContext, useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Alert } from "react-native";
import * as Location from 'expo-location';
import FilterContext from "../context/FilterContext";
import CustomMapMarker from "./CustomMapMarker";
import CustomMapCallout from "./CustomMapCallout";

export default function Map() {
  const context = useContext(FilterContext);
  const addresses = context.results;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          "Permission required",
          "This app needs location permission to show your location on the map.",
          [{ text: "OK" }]
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 1.368791033335324,
          longitude: location ? location.longitude : 103.80777095700411,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        showsUserLocation={true}
      >
        {/* {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="My Location"
          />
        )} */}
        {addresses.map((address, i) => (
          <Marker key={i} coordinate={{ latitude: address.lat, longitude: address.lon }}>
            <CustomMapMarker avg_price={address.avg_price} />
            <Callout>
              <CustomMapCallout address={address} />
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
