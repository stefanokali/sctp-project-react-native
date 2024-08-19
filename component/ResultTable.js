import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";

import FilterContext from "../context/FilterContext";

const ResultTable = () => {
  const context = useContext(FilterContext);
  const addresses = context.results;

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const recordsPerPage = 10;
  const firstIndex = page * recordsPerPage;
  const lastIndex = Math.min((page + 1) * recordsPerPage, addresses.length);
  const records = addresses.slice(firstIndex, lastIndex);

  const npage = Math.ceil(addresses.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  //const navigate = useNavigate();

  const prevPage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage((prevPage) => parseInt(prevPage) - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) {
      setCurrentPage((prevPage) => parseInt(prevPage) + 1);
    }
  };

  const handleGoToPage = (e) => {
    if (e.target.value == "") {
      setGoToPage(e.target.value);
    }
    if (e.target.value >= 1 && e.target.value <= npage) {
      setGoToPage(e.target.value);
      setCurrentPage(e.target.value);
    }
  };

  const handlerShowPrevTransactions = (address) => {
    const { block, street_name } = address;
    context.setIsSelected(true);
    //navigate(`../trend/${block}/${street_name}`);
    window.open(`../trend/${block}/${street_name}`);
  };

  const handlerShowOnMap = (address) => {
    console.log("map", context.map);
    console.log("Address", address);
    const { lat, lon } = address;
    console.log(lat, lon);
    context.map.flyTo([lat, lon], 18);
  };



  const [items] = useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <Text>No of records: {addresses.length}</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>

        {records.map((record, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell>{record.address}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      {/* <Button title="Prev" class="prev" onClick={(e) => prevPage(e)}></Button>
      <View>
        <Text>
          Curent page: {currentPage}/{npage}
        </Text>
        <Text>
          Go to page:
          <TextInput value={goToPage} onChange={(e) => handleGoToPage(e)} />
        </Text>
      </View>
      <Button title="Next" class="next" onClick={(e) => nextPage(e)}></Button> */}
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
