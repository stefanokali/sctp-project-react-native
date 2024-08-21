import React, { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import FilterContext from "../context/FilterContext";
import { useNavigation } from "@react-navigation/native";

export default function CustomMapCallout({address}) {

    const navigation = useNavigation();

    const context = useContext(FilterContext);

    const handlerShowPrevTransactions = (address) => {
        const { block, street_name } = address;
        context.setIsSelected(true);
        navigation.navigate("PrevTransaction", {
          block,
          street_name,
        });
      };

  return (
    <>
      <Text>{address.address}</Text>
      <Button title="Detail" onPress={() => handlerShowPrevTransactions(address)}/>
    </>
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
