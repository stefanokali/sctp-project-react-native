import React, { useContext, useState, useEffect } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";

import FilterContext from "../context/FilterContext";
import { CurrentRenderContext } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrevTransactionScreen from "../screens/PrevTransactionScreen";

const Stack = createNativeStackNavigator();

const ResultTable = () => {
  const navigation = useNavigation();

  const context = useContext(FilterContext);
  const addresses = context.results;

  const [page, setPage] = useState(0);

  const recordsPerPage = 5;
  const firstIndex = page * recordsPerPage;
  const lastIndex = Math.min((page + 1) * recordsPerPage, addresses.length);
  const records = addresses.slice(firstIndex, lastIndex);

  // const npage = Math.ceil(addresses.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  //const navigate = useNavigate();

  const handlerShowPrevTransactions = (address) => {
    const { block, street_name } = address;
    context.setIsSelected(true);
    navigation.navigate("PrevTransaction", {
      block,
      street_name,
    });
  };

  const handlerShowOnMap = (address) => {
    console.log("map", context.map);
    console.log("Address", address);
    const { lat, lon } = address;
    console.log(lat, lon);
    context.map.flyTo([lat, lon], 18);
  };

  const from = page * recordsPerPage;
  const to = Math.min((page + 1) * recordsPerPage, addresses.length);

  return (
    <>
      <Text>No of records: {addresses.length}</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 0.3, justifyContent: "center" }}>
            No
          </DataTable.Title>
          <DataTable.Title style={{ flex: 2.5, justifyContent: "center" }}>
            Address
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
            Avg Price (SGD)
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
            Detail
          </DataTable.Title>
        </DataTable.Header>

        {records.map((record, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell style={{ flex: 0.3, justifyContent: "center" }}>
              {page * recordsPerPage + i + 1}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2.5, justifyContent: "center" }}>
              {record.address}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
              {record.avg_price}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
              <Button
                title="Detail"
                onPress={() => handlerShowPrevTransactions(record)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(addresses.length / recordsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${addresses.length}`}
          //numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={recordsPerPage}
          //onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          //selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>

      <Stack.Navigator>
        <Stack.Screen
          name="PrevTransaction"
          component={PrevTransactionScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default ResultTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
});
