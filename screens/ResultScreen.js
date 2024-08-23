import React, { useContext, useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import FilterContext from "../context/FilterContext";
import { apiHDBGet } from "../helperApi";
import ResultTable from "../component/ResultTable";
import Map from "../component/Map";

const ResultScreen = () => {
  let initialLoad = true;

  const [loading, setLoading] = useState(false);

  const rowLimit = 10000;
  const totalRow = 0;
  const context = useContext(FilterContext);

  useEffect(() => {
    if (initialLoad) {
      setLoading(true);
      apiHDBGet({
        rowLimit: rowLimit,
        totalRow: totalRow,
        context: context,
        setLoading: setLoading,
      });
      initialLoad = false;
    }
  }, [context.selected]);

  //Check if filter already chosen
  if (context.filters.count == 0){
    const isFiltered = False;
  }

  return (
    <>
      {loading ? (
        // <ClipLoader color="#36d7b7" />
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>Results of average sales by Area</Text>
          <View className="table-container">
            <ResultTable className="flex-child" />
            {/* <Map className="flex-child" /> */}
          </View>
          <Map />
        </>
      )}
    </>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
});
