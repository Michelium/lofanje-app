import React, { useState, useEffect } from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import * as Colors from "../config/colors";
import Header from "../components/form/Header";
import EntryForm from "../components/form/EntryForm";

const FormScreen = ({route}) => {

  const {category} = route.params;

  return (
    <View style={styles.container}>
      <Header category={category}/>
      <EntryForm category={category}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default FormScreen;
