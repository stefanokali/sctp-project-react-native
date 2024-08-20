import React, { useEffect, useState, useContext } from "react";
import { Text } from "react-native";
import PrevTransactionTable from "../component/PrevTransactionTable";
import FilterContext from "../context/FilterContext";
import { apiHDBGetSpecificAddress } from "../helperApi";

const PrevTransactionScreen = ({ route }) => {
  if (route.params) {
    let initialLoad = true;
    const [loading, setLoading] = useState(true);
    const rowLimit = 10000;
    const totalRow = 0;
    const context = useContext(FilterContext);

    const { block, street_name } = route.params;

    useEffect(() => {
      if (initialLoad) {
        setLoading(true);
        apiHDBGetSpecificAddress({
          rowLimit: rowLimit,
          totalRow: totalRow,
          context: context,
          setLoading: setLoading,
          params: route.params,
        });
        initialLoad = false;
      }
    }, []);

    return (
      <>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text>{`${block} ${street_name}`}</Text>
            <PrevTransactionTable></PrevTransactionTable>
          </>
        )}
      </>
    );
  }
};

export default PrevTransactionScreen;
