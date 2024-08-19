import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";

import ResultScreen from "./screens/ResultScreen";
import { FilterProvider } from "./context/FilterContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <FilterProvider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Result" component={ResultScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </FilterProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
