import React from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import * as Colors from "../config/colors";
import { Octicons } from "@expo/vector-icons";
import Divider from "../common/Divider";
import { Foundation } from "@expo/vector-icons";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { baseUrl } from "./../helpers/axios-helper";
import { AntDesign } from "@expo/vector-icons";

const SettingsScreen = () => {
  const appVersion = Constants.expoConfig.version;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.headerText}>Preferences</Text>
          <View style={styles.blockItem}>
            <View style={styles.blockIcon}>
              <MaterialCommunityIcons name="theme-light-dark" size={22} color={Colors.text} />
            </View>
            <View style={styles.blockHorizontal}>
              <Text style={styles.blockTitle}>Application theme</Text>
              <Text style={styles.blockTextSetting}>dark</Text>
            </View>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.headerText}>About app</Text>
          <View style={styles.blockItem}>
            <View style={styles.blockIcon}>
              <Octicons name="versions" size={22} color={Colors.text} />
            </View>
            <View style={styles.blockText}>
              <Text style={styles.blockTitle}>Version</Text>
              <Text style={styles.blockTextContent}>{appVersion}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.blockItem}>
            <View style={styles.blockIcon}>
              <MaterialCommunityIcons style={styles.blockItem} name="database-cog" size={24} color={Colors.text} />
            </View>
            <View style={styles.blockText}>
              <Text style={styles.blockTitle}>API endpoint</Text>
              <Text style={styles.blockTextContent}>{baseUrl}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.blockItem}>
            <View style={styles.blockIcon}>
              <Foundation style={styles.blockItem} name="torso-business" size={24} color={Colors.text} />
            </View>
            <View style={styles.blockText}>
              <Text style={styles.blockTitle}>Creator</Text>
              <Text style={styles.blockTextContent}>Michel Hamelink - Hamelink Webdevelopment</Text>
            </View>
          </View>
        </View>

        <View style={styles.block}>
          <View style={styles.blockItem}>
            <View style={styles.blockIcon}>
              <Text>🇳🇱</Text>
            </View>
            <View>
              <Text style={styles.blockTextContent}>Proudly created in the Netherlands.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 15,
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  block: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  blockItem: {
    flexDirection: "row",
    columnGap: 15,
    marginVertical: 9,
  },
  blockHorizontal: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  blockIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
  },
  blockText: {
    justifyContent: "center",
  },
  blockTitle: {
    fontSize: 14,
  },
  blockTextContent: {
    fontSize: 12,
    fontWeight: "300",
    color: Colors.secondaryText,
  },
  blockTextSetting: {
    fontSize: 14,
    color: Colors.blueText,
  },
});

export default SettingsScreen;
