import React, { useContext } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import FilterContext from "../context/FilterContext";
import CustomMapMarker from "./CustomMapMarker";
import CustomMapCallout from "./CustomMapCallout";

export default function Map() {
  const context = useContext(FilterContext);
  const addresses = context.results;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.368791033335324,
          longitude: 103.80777095700411,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        showsUserLocation = {true}
      >
        {addresses.map((address, i) => (
          //   <Marker
          //     key={i}
          //     coordinate={{latitude: address.lat, longitude: address.lon}}
          //     title={`SGD ${address.avg_price.toString()}`}
          //     description={address.address}
          //   />
          <Marker
            coordinate={{ latitude: address.lat, longitude: address.lon }}
            key={i}
          >
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
