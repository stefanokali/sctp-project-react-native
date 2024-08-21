import React, { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import FilterContext from "../context/FilterContext";
import { useNavigation } from "@react-navigation/native";

export default function CustomMapMarker({avg_price}) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{avg_price.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    
  },
});
