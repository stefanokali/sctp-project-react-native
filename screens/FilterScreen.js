import React, { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FilterContext from "../context/FilterContext";

const towns = [
  "All",
  "ANG MO KIO",
  "BEDOK",
  "BISHAN",
  "BUKIT BATOK",
  "BUKIT MERAH",
  "BUKIT PANJANG",
  "BUKIT TIMAH",
  "CENTRAL AREA",
  "CHOA CHU KANG",
  "CLEMENTI",
  "GEYLANG",
  "HOUGANG",
  "JURONG EAST",
  "JURONG WEST",
  "KALLANG/WHAMPOA",
  "MARINE PARADE",
  "PASIR RIS",
  "PUNGGOL",
  "QUEENSTOWN",
  "SEMBAWANG",
  "SENGKANG",
  "SERANGOON",
  "TAMPINES",
  "TOA PAYOH",
  "WOODLANDS",
  "YISHUN",
];

const flatTypes = [
  "All",
  "2 ROOM",
  "3 ROOM",
  "4 ROOM",
  "5 ROOM",
  "EXECUTIVE",
  "1 ROOM",
  "MULTI-GENERATION",
];

const storyRanges = [
  "All",
  "10 TO 12",
  "01 TO 03",
  "04 TO 06",
  "07 TO 09",
  "13 TO 15",
  "19 TO 21",
  "22 TO 24",
  "16 TO 18",
  "34 TO 36",
  "28 TO 30",
  "37 TO 39",
  "49 TO 51",
  "25 TO 27",
  "40 TO 42",
  "31 TO 33",
  "46 TO 48",
  "43 TO 45",
];

const flatModels = [
  "All",
  "Improved",
  "New Generation",
  "DBSS",
  "Standard",
  "Apartment",
  "Simplified",
  "Model A",
  "Premium Apartment",
  "Adjoined flat",
  "Model A-Maisonette",
  "Maisonette",
  "Type S1",
  "Type S2",
  "Model A2",
  "Terrace",
  "Improved-Maisonette",
  "Premium Maisonette",
  "Multi Generation",
  "Premium Apartment Loft",
  "2-room",
  "3Gen",
];

const FilterScreen = () => {
  const navigation = useNavigation();
  const context = useContext(FilterContext);

  const [resaleDateStart, setResaleDateStart] = useState(new Date(1965, 1, 1));
  const [resaleDateEnd, setResaleDateEnd] = useState(new Date());
  const [leaseDateStart, setLeaseDateStart] = useState(new Date(1965, 1, 1));
  const [leaseDateEnd, setLeaseDateEnd] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateSetter, setCurrentDateSetter] = useState(null);

  const [town, setTown] = useState("All");
  const [flatType, setFlatType] = useState("All");
  const [storyRange, setStoryRange] = useState("All");
  const [flatModel, setFlatModel] = useState("All");

  const [minFloorArea, setMinFloorArea] = useState("0");
  const [maxFloorArea, setMaxFloorArea] = useState("300");

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("2000000");

  const showDatepicker = (date, dateSetter) => {
    setCurrentDate(date);
    setCurrentDateSetter(() => dateSetter);
    setShowPicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const newDate = selectedDate || currentDate;
    setCurrentDate(newDate);
    if (Platform.OS === 'android') {
      currentDateSetter(newDate);
      setShowPicker(false);
    }
  };

  const handleConfirm = () => {
    currentDateSetter(currentDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const handleSubmit = () => {
    const newFilter = {
      resaleDateStart,
      resaleDateEnd,
      leaseDateStart,
      leaseDateEnd,
      town,
      flatType,
      storyRange,
      flatModel,
      minFloorArea,
      maxFloorArea,
      minPrice,
      maxPrice,
    };

    const filterHistory = [...context.filters, newFilter];
    console.log(filterHistory);
    context.setFilters(filterHistory);
    context.setIsFiltered(true);
    context.setSelected(context.filters.length);

    navigation.navigate("Result");
  };

  const renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          transparent={true}
          visible={showPicker}
          animationType="slide"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={currentDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.datePicker}
              />
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={handleCancel} />
                <Button title="Confirm" onPress={handleConfirm} />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      );
    } else {
      return showPicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text>Resale date start:</Text>
            <TouchableOpacity onPress={() => showDatepicker(resaleDateStart, setResaleDateStart)}>
              <Text>{resaleDateStart.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text>Resale date end:</Text>
            <TouchableOpacity onPress={() => showDatepicker(resaleDateEnd, setResaleDateEnd)}>
              <Text>{resaleDateEnd.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text>Lease date start:</Text>
            <TouchableOpacity onPress={() => showDatepicker(leaseDateStart, setLeaseDateStart)}>
              <Text>{leaseDateStart.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text>Lease date end:</Text>
            <TouchableOpacity onPress={() => showDatepicker(leaseDateEnd, setLeaseDateEnd)}>
              <Text>{leaseDateEnd.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          {renderDatePicker()}

          <View style={styles.row}>
            <Text style={styles.label}>Town: </Text>
            <Text> </Text>
            <Text style={styles.label}>Flat type:</Text>
          </View>

          <View style={styles.row}>
            <Picker
              style={styles.picker}
              selectedValue={town}
              onValueChange={(itemValue) => setTown(itemValue)}
            >
              {towns.map((town, i) => {
                return <Picker.Item key={i} label={town} value={town} />;
              })}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={flatType}
              onValueChange={(itemValue) => setFlatType(itemValue)}
            >
              {flatTypes.map((flatType, i) => {
                return (
                  <Picker.Item key={i} label={flatType} value={flatType} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Story range:</Text>
            <Text> </Text>
            <Text style={styles.label}>Flat model:</Text>
          </View>

          <View style={styles.row}>
            <Picker
              style={styles.picker}
              selectedValue={storyRange}
              onValueChange={(itemValue) => setStoryRange(itemValue)}
            >
              {storyRanges.map((storyRange, i) => {
                return (
                  <Picker.Item key={i} label={storyRange} value={storyRange} />
                );
              })}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={flatModel}
              onValueChange={(itemValue, itemIndex) => setFlatModel(itemValue)}
            >
              {flatModels.map((flatModel, i) => {
                return (
                  <Picker.Item key={i} label={flatModel} value={flatModel} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.row}>
            <Text>Min floor area (sqm):</Text>
            <TextInput
              value={minFloorArea}
              onChangeText={setMinFloorArea}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text>Max floor area (sqm):</Text>
            <TextInput
              value={maxFloorArea}
              onChangeText={setMaxFloorArea}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text>Min price (SGD):</Text>
            <TextInput value={minPrice} onChangeText={setMinPrice}></TextInput>
          </View>
          <View style={styles.row}>
            <Text>Max price (SGD):</Text>
            <TextInput value={maxPrice} onChangeText={setMaxPrice}></TextInput>
          </View>
          <Button title="Submit" onPress={handleSubmit}></Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  picker: {
    width: "50%",
  },
  label: {
    marginHorizontal: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
