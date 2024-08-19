import apiHDB from "./api/apiHDB";
import { useState, useEffect } from "react";
import { hdbCoord } from "./data/hdbCoord";
import apiLocal from "./api/apiLocal";

export const apiHDBGet = async ({
  rowLimit,
  totalRow,
  context,
  setLoading,
}) => {
  try {
    // const {
    //   town,
    //   flat_type,
    //   storey_range,
    //   flat_model,
    //   floor_area_sqm,
    //   lease_commence_date,
    //   month,
    //   resale_price,
    // } = context.filters[context.filters.length - 1];

    const town = "ANG MO KIO"
    const flat_type = "All"
    const storey_range = "All"
    const flat_model = "All"
    const floor_area_sqm = "All"
    const lease_commence_date = "All"
    const month = "All"
    const resale_price = "All"

    //Build filter based on API requirements
    let filter =
      "{" +
      (town != "All" && town != "" ? '"town": "' + town + '",' : "") +
      (flat_type != "All" && flat_type != ""
        ? '"flat_type": "' + flat_type + '",'
        : "") +
      (storey_range != "All" && storey_range != ""
        ? '"storey_range": "' + storey_range + '",'
        : "") +
      (flat_model != "All" && flat_model != ""
        ? '"flat_model": "' + flat_model + '",'
        : "");

    if (filter[filter.length - 1] == ",") {
      filter = filter.slice(0, -1);
    }

    filter += "}";
    console.log("testfilters", filter);

    //First call to check how many rows are there
    const response = await apiHDB.get(``, {
      params: {
        resource_id: "d_8b84c4ee58e3cfc0ece0d773c8ca6abc",
        // limit: 1,
        filters: filter,
      },
    });

    //Set rowLimit if totalRow < rowLimit
    totalRow = response.data.result.total;
    if (totalRow < rowLimit) {
      rowLimit = totalRow;
    }

    //Add filter
    const promises = [];

    let rowRead = 0;
    while (rowRead < totalRow) {
      promises.push(
        await apiHDB.get(``, {
          params: {
            resource_id: "d_8b84c4ee58e3cfc0ece0d773c8ca6abc",
            limit: rowLimit,
            offset: rowRead,
            filters: filter,
          },
        })
      );

      //setRowRead(prevState => prevState + rowLimit);
      rowRead += rowLimit;
    }

    //Use Promise.all combinator
    const apiCallResults = await Promise.all(promises);

    //Save in listofHdb
    let listOfHdb = [];

    apiCallResults.map((apiCallResult) => {
      const records = apiCallResult.data.result.records;
      records.map((record) => {
        listOfHdb.push(record);
      });
    });

    /*

    //Additional filter that cant use API, front end filter
    //Transaction month filter
    let transactionTimeStart = month[0];
    if (transactionTimeStart == null) {
      transactionTimeStart = new Date(0, 0);
    }
    let transactionTimeEnd = month[1];
    if (transactionTimeEnd == null) {
      transactionTimeEnd = new Date();
    } // return current date

    listOfHdb = listOfHdb.filter((hdb) => {
      const hdbTransactionTime = new Date(
        hdb.month.split("-")[0],
        hdb.month.split("-")[1]
      );
      return (
        hdbTransactionTime > transactionTimeStart &&
        hdbTransactionTime < transactionTimeEnd
      );
    });

    //Lease start filter
    let leaseStart = lease_commence_date[0];
    if (leaseStart == null) {
      leaseStart = new Date(0, 0);
    }
    let leaseEnd = lease_commence_date[1];
    if (leaseEnd == null) {
      leaseEnd = new Date();
    } // return current date

    listOfHdb = listOfHdb.filter((hdb) => {
      const hdbLeaseYear = new Date(hdb.lease_commence_date, 0);
      return hdbLeaseYear > leaseStart && hdbLeaseYear < leaseEnd;
    });

    //Sqm filter
    const priceMin = resale_price[0];
    const priceMax = resale_price[1];

    listOfHdb = listOfHdb.filter((hdb) => {
      return hdb.resale_price > priceMin && hdb.resale_price < priceMax;
    });

    //Price filter
    const floorSqMin = floor_area_sqm[0];
    const floorSqMax = floor_area_sqm[1];

    listOfHdb = listOfHdb.filter((hdb) => {
      return hdb.floor_area_sqm > floorSqMin && hdb.floor_area_sqm < floorSqMax;
    });

    */

    console.log("listOfHdb after front end filtering", listOfHdb[0]);

    //Get unique addresses only and its average price
    const varUniqueAddresses = [];
    const varBlock = [];
    const varStreetName = [];
    const varTotalPricePerAddresses = [];
    const varCountPerAddresses = [];
    listOfHdb.map((hdb) => {
      const hdbAddress = hdb.block + " " + hdb.street_name;

      if (varUniqueAddresses.indexOf(hdbAddress) == -1) {
        varUniqueAddresses.push(hdbAddress);
        varBlock.push(hdb.block);
        varStreetName.push(hdb.street_name);
        varTotalPricePerAddresses.push(parseFloat(hdb.resale_price));
        varCountPerAddresses.push(1);
      } else {
        varTotalPricePerAddresses[varUniqueAddresses.indexOf(hdbAddress)] +=
          parseFloat(hdb.resale_price);
        varCountPerAddresses[varUniqueAddresses.indexOf(hdbAddress)] += 1;
      }
    });

    //Get avg price
    const varAveragePrices = [];
    varTotalPricePerAddresses.map((varTotalPricePerAddress, index) => {
      varAveragePrices.push(
        parseInt(varTotalPricePerAddress / varCountPerAddresses[index])
      );
    });

    //Get coord of HDB
    const listOfHdbWithCoord = varUniqueAddresses.map(
      (varUniqueAddress, index) => {
        const hdbAddress = varUniqueAddress;
        const filterResult = hdbCoord.filter(
          (eachHdbCoord) => eachHdbCoord.Address === hdbAddress
        );
        if (filterResult.length > 0) {
          const newHdb = {
            address: varUniqueAddress,
            block: varBlock[index],
            street_name: varStreetName[index],
            lat: filterResult[0].Lat,
            lon: filterResult[0].Lon,
            avg_price: varAveragePrices[index],
          };

          return newHdb;
        }
      }
    );

    console.log("listOfHdbWithCoords=", listOfHdbWithCoord[0])

    context.setResults(listOfHdbWithCoord);

    setLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export const apiHDBGetSpecificAddress = async ({
  rowLimit,
  totalRow,
  context,
  setLoading,
  params,
}) => {
  try {
    //Get block and street name
    const { block, street_name } = params;

    const filters = `{"block":"${block}", "street_name":"${street_name}"}`;

    //First call to check how many rows are there
    const response = await apiHDB.get(``, {
      params: {
        resource_id: "d_8b84c4ee58e3cfc0ece0d773c8ca6abc",
        limit: 1,
        filters: filters,
      },
    });

    totalRow = response.data.result.total;

    //Set rowLimit if totalRow < rowLimit
    if (totalRow < rowLimit) {
      rowLimit = totalRow;
    }

    const promises = [];

    let rowRead = 0;
    while (rowRead < totalRow) {
      promises.push(
        await apiHDB.get(``, {
          params: {
            resource_id: "d_8b84c4ee58e3cfc0ece0d773c8ca6abc",
            limit: rowLimit,
            offset: rowRead,
            filters: filters,
          },
        })
      );

      //setRowRead(prevState => prevState + rowLimit);
      rowRead += rowLimit;
    }

    //Use Promise.all combinator
    const apiCallResults = await Promise.all(promises);

    //Save in listofHdb
    const listOfHdb = [];

    apiCallResults.map((apiCallResult) => {
      const records = apiCallResult.data.result.records;
      records.map((record) => {
        listOfHdb.push(record);
      });
    });

    context.setResultsAddressChosen(listOfHdb);
    
    setLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export const apiLocalGetFavourite = async ({
  id,
  setLoading,
  setFavourites,
}) => {
  try {
    const response = await apiLocal.get(`/user/${id}/favourite`);
    setFavourites(response.data);
    setLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export const apiLocalPostFavourite = async ({ id, block, streetName }) => {

  try {
    const response = await apiLocal.post(`/user/${id}/favourite`, {
      "block": block,
      "streetName": streetName,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const apiLocalDeleteFavourite = async ({ id, setFavourites, setLoading, favId }) => {

  try {
    const responseDelete = await apiLocal.delete(`/user/favourite/${favId}`);

    //Update favourites
    const responseGet = await apiLocal.get(`/user/${id}/favourite`);
    console.log(responseGet)
    setFavourites(responseGet.data);
    setLoading(false);

  } catch (error) {
    console.log(error.message);
  }
};
