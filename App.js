import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./src/config/lofanje-theme.json";
import { default as mapping } from "./src/config/mapping.json";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import * as Colors from "./src/config/colors";
import FormScreen from "./src/screens/FormScreen";
import FlashMessage from "react-native-flash-message";
import { StyleSheet } from "react-native";
import SettingsScreen from "./src/screens/SettingsScreen";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }} customMapping={mapping}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={Colors.background}
          style="light"
        />
        <FlashMessage position="top" statusBarHeight={40} style={styles.flashMessage} />
        <Tab.Navigator
          screenOptions={{
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: Colors.background,
              shadowOffset: { width: 0, height: 0 },
            },
            headerTitleStyle: {
              color: Colors.text,
              fontWeight: "600",
              textAlign: "left",
            },
            tabBarStyle: {
              display: "none",
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "lofanje",
            }}
          />
          <Tab.Screen
            name="Form"
            component={FormScreen}
            options={{
              title: "lofanje",
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: "settings",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  flashMessage: {
    paddingTop: 20,
    // marginTop: 20,
  },
});

export default App;
