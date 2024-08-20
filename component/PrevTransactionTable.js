import React, { useContext, useState, useEffect } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";

import FilterContext from "../context/FilterContext";
import { useNavigation } from "@react-navigation/native";

const PrevTransactionTable = () => {
  const navigation = useNavigation();

  const context = useContext(FilterContext);
  const addresses = context.resultsAddressChosen;

  const [page, setPage] = useState(0);

  const recordsPerPage = 10;
  const firstIndex = page * recordsPerPage;
  const lastIndex = Math.min((page + 1) * recordsPerPage, addresses.length);
  const records = addresses.slice(firstIndex, lastIndex);

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
          <DataTable.Title style={{ flex: 1.5, justifyContent: "center" }}>
            Month
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
            Flat Type
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1.5, justifyContent: "center" }}>
            Floor Area (sqm)
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
            Price (SGD)
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
            Price/Area (SGD/m2)
          </DataTable.Title>
        </DataTable.Header>

        {records.map((record, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell style={{ flex: 0.3, justifyContent: "center" }}>
            {page * recordsPerPage + i + 1}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1.5, justifyContent: "center" }}>
              {record.month}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
              {record.flat_type}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1.5, justifyContent: "center" }}>
              {record.floor_area_sqm}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
              {record.resale_price}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
              {parseInt(
                parseFloat(record.resale_price) /
                  parseFloat(record.floor_area_sqm)
              )}
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
    </>
  );
};

export default PrevTransactionTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
});
