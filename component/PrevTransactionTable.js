import React, { useContext, useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { DataTable } from "react-native-paper";

import FilterContext from "../context/FilterContext";

const PrevTransactionTable = () => {
    const context = useContext(FilterContext);
    console.log("context", context.resultsAddressChosen)

    const addresses = context.resultsAddressChosen;

    console.log("addresses", addresses)
  
    const [goToPage, setGoToPage] = useState(1);
  
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 20;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = addresses.slice(firstIndex, lastIndex);
    const npage = Math.ceil(addresses.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

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
  
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );
  
    const [items] = useState([
     {
       key: 1,
       name: 'Cupcake',
       calories: 356,
       fat: 16,
     },
     {
       key: 2,
       name: 'Eclair',
       calories: 262,
       fat: 16,
     },
     {
       key: 3,
       name: 'Frozen yogurt',
       calories: 159,
       fat: 6,
     },
     {
       key: 4,
       name: 'Gingerbread',
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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>
  
        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
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
          selectPageDropdownLabel={'Rows per page'}
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
}

export default PrevTransactionTable

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    tableHeader: {
      backgroundColor: "#DCDCDC",
    },
  });