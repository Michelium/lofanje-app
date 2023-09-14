import React, { useState, useEffect } from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import * as Colors from "../config/colors";
import EntryForm from "../components/form/EntryForm";

const FormScreen = ({route}) => {

  const {category, entry} = route.params;

  return (
    <View style={styles.container}>
      <EntryForm category={category} entry={entry}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default FormScreen;
