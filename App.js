import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import HomeScreen from "./src/screens/HomeScreen";
import FormScreen from "./src/screens/FormScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./src/config/lofanje-theme.json";
import { default as mapping } from "./src/config/mapping.json";
import * as Colors from "./src/config/colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }} customMapping={mapping}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.background} style="light" />
        <FlashMessage position="top" statusBarHeight={40} style={styles.flashMessage} />
        <Tab.Navigator
          screenOptions={({ navigation }) => ({
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
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              title: "lofanje",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Settings");
                  }}
                  style={{marginRight: 16}}
                >
                  <MaterialIcons name="settings" size={24} color={Colors.text} />
                </TouchableOpacity>
              ),
            })}
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
            options={({navigation}) => ({
              title: "settings",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                  style={{marginLeft: 16}}
                >
                  <Feather name="arrow-left" size={24} color={Colors.text} />
                </TouchableOpacity>
              ),
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  flashMessage: {
    paddingTop: 20,
  },
});

export default App;
