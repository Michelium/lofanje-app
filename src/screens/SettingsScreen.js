import React, { useState, useEffect } from "react";
import { Text } from "@ui-kitten/components";
import SearchBar from "../components/home/SearchBar";
import CategorySelector from "../components/home/CategorySelector";
import CategorySearch from "../components/home/CategorySearch";
import { StyleSheet, View } from "react-native";
import * as Colors from "../config/colors";
import EntryList from "../components/home/EntryList";

const SettingsScreen = () => {
  const [category, setCategory] = useState("nouns");
  const [categorySearchInput, setCategorySearchInput] = useState('');

  useEffect(() => {
    setCategorySearchInput('');
  }, [category]);

  return (
    <View style={styles.container}>
      <SearchBar />
      <CategorySelector category={category} setCategory={setCategory} />
      <CategorySearch category={category} setCategorySearchInput={setCategorySearchInput} />
      <EntryList category={category} searchInput={categorySearchInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SettingsScreen;
