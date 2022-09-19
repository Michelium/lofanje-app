import React from "react";
import { View, StyleSheet } from "react-native";
import * as Colors from "../config/colors";

const Divider = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginTop: 5,
    borderColor: Colors.dark_grey,
  },
});

export default Divider;
