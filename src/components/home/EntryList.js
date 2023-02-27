import { Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Modal } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import axiosInstance from "../../helpers/axios-helper";
import EntryRow from "./EntryRow";
import EntryModal from "./EntryModal";

const EntryList = ({ category }) => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState([]);
  const [fields, setFields] = useState([]);
  const [humanFields, setHumanFields] = useState([]);

  const getEntries = async () => {
    try {
      const response = await axiosInstance.get(`/entries/${category}`);
      setEntries(response.data);

    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  const getFields = async () => {
    try {
      const responseFields = await axiosInstance.get(`/fields?category=${category}`);
      setFields(responseFields.data);
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        alert("Something went wrong.");
      }
    }

    try {
      const responseHumanFields = await axiosInstance.get(`/fields?category=${category}&human_readable=1`);
      setHumanFields(responseHumanFields.data);
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
    getFields();
  }, [category]);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <EntryModal setModalVisible={setModalVisible} modalVisible={modalVisible} entry={modalEntry} fields={fields} humanFields={humanFields} />
      </Modal>
      <Text category="h4" style={styles.title}>
        {category !== "verbs" ? "base form" : "infinitive"}
      </Text>
      <Divider />
      <FlatList data={entries} renderItem={(entry) => <EntryRow category={category} entry={entry.item} setModalVisible={setModalVisible} setModalEntry={setModalEntry} />} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} />
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
