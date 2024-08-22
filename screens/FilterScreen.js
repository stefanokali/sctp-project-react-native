import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";

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
  const [selectedLanguage, setSelectedLanguage] = useState();

    const [resaleDateStart, setResaleDateStart] = useState(new Date())

    handleDateChange = (e) => {
        console.log(e)
    }

  return (
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={100}>
    <ScrollView>
        
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Select resale date start:</Text>
          <RNDateTimePicker mode="date" value={resaleDateStart} />
        </View>
        <View style={styles.row}>
          <Text>Select resale date end:</Text>
          <RNDateTimePicker mode="date" value={new Date()} />
        </View>
        <View style={styles.row}>
          <Text>Select lease date start:</Text>
          <RNDateTimePicker mode="date" value={new Date()} />
        </View>
        <View style={styles.row}>
          <Text>Select lease date end:</Text>
          <RNDateTimePicker mode="date" value={new Date()} />
        </View>
        <View style={styles.row}>
          <Text>Town:</Text>
          <Text> </Text>
          <Text>Flat type:</Text>
        </View>

        <View style={styles.row}>
          <Picker
            style={styles.picker}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            {towns.map((town, i) => {
              return <Picker.Item key={i} label={town} value={town} />;
            })}
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            {flatTypes.map((flatType, i) => {
              return <Picker.Item key={i} label={flatType} value={flatType} />;
            })}
          </Picker>
        </View>
        <View style={styles.row}>
          <Text>Story range:</Text>
          <Text> </Text>
          <Text>Flat model:</Text>
        </View>

        <View style={styles.row}>
          <Picker
            style={styles.picker}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            {storyRanges.map((storyRange, i) => {
              return <Picker.Item key={i} label={storyRange} value={storyRange} />;
            })}
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            {flatModels.map((flatModel, i) => {
              return <Picker.Item key={i} label={flatModel} value={flatModel} />;
            })}
          </Picker>
        </View>
        <View style={styles.row}>
          <Text>Min floor area (sqm):</Text>
          <TextInput></TextInput>
        </View>
        <View style={styles.row}>
          <Text>Max floor area (sqm):</Text>
          <TextInput></TextInput>
        </View>
        <View style={styles.row}>
          <Text>Min price (SGD):</Text>
          <TextInput></TextInput>
        </View>
        <View style={styles.row}>
          <Text>Max price (SGD):</Text>
          <TextInput></TextInput>
        </View>
        <Button title="Submit"></Button>
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
});
