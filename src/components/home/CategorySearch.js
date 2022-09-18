import { Input } from "@ui-kitten/components";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../common/Button";
import * as Colors from "../../config/colors";

const CategorySearch = ({ category }) => {
  return (
    <View style={styles.container}>
      <Input style={styles.input} placeholder={"search " + category} autoCapitalize="none" returnKeyType="search" textStyle={{ fontWeight: "500" }} />
      <Button title="search" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.light_background,
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  input: {
    flex: 2,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 0,
  },
  button: {
    // flex: 2,
    alignSelf: "center",
  },
});

export default CategorySearch;
