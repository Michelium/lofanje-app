import { ApplicationProvider, Layout, TopNavigation } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./src/config/lofanje-theme.json";
import { default as mapping } from "./src/config/mapping.json";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import * as Colors from "./src/config/colors";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: Colors.primary,
              borderBottomColor: Colors.primary,
              shadowOffset: { width: 0, height: 0 },
            },
            headerTitleStyle: {
              color: Colors.white,
              fontWeight: '600',
              textAlign: "left",
            },
            tabBarStyle: {
              display: 'none'
            }
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "lofanje",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

export default App;
