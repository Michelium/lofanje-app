import { Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import axiosInstance from "../../helpers/axios-helper";
import EntryRow from "./EntryRow";

const EntryList = ({ category }) => {
  const [entries, setEntries] = useState([]);

  const getEntries = async () => {
    try {
      const response = await axiosInstance.get(`api/get-entries/${category}`);
      setEntries(response.data);
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    getEntries();
  }, [category]);

  return (
    <View style={styles.container}>
      <Text category="h4" style={styles.title}>
        {category !== "verbs" ? "base form" : "infinitive"}
      </Text>
      <Divider />
      <FlatList data={entries} renderItem={(entry) => <EntryRow category={category} entry={entry.item} />} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    color: Colors.primary,
  },
});

export default EntryList;
