import React, { useState } from "react";
import { Text } from "@ui-kitten/components";
import SearchBar from "../components/home/SearchBar";
import CategorySelector from "../components/home/CategorySelector";
import CategorySearch from "../components/home/CategorySearch";
import { StyleSheet, View } from "react-native";
import * as Colors from "../config/colors";

const HomeScreen = () => {
  const [category, setCategory] = useState("nouns");

  return (
    <View style={styles.container}>
      <SearchBar />
      <CategorySelector category={category} setCategory={setCategory} />
      <CategorySearch category={category} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default HomeScreen;
