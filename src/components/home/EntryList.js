import { Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Modal } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import axiosInstance from "../../helpers/axios-helper";
import EntryRow from "./EntryRow";
import EntryModal from "./EntryModal";
import Button from "../../common/Button";
import { useNavigation } from '@react-navigation/core';

const EntryList = ({ category, searchInput }) => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);
  const [entriesLoading, setEntriesLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState([]);
  const [fields, setFields] = useState([]);

  const getEntries = async () => {
    try {
      const response = await axiosInstance.get(`/entries/${category}?keyword=${searchInput}`);
      setEntries(response.data);
      setEntriesLoading(false);
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
  };

  useEffect(() => {
    setEntriesLoading(true);
    getEntries();
    getFields();
  }, [category, searchInput]);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)} propagateSwipe={true} onBackButtonPress={() => setModalVisible(false)} onBackdropPress={() => setModalVisible(false)} onSwipe={() => setModalVisible(false)} onSwipeThreshold={20}>
        <EntryModal setModalVisible={setModalVisible} modalVisible={modalVisible} entry={modalEntry} fields={fields} />
      </Modal>
      <View style={styles.tableHeader}>
        <Text category="h4" style={styles.title}>
          {category !== "verbs" ? "base form" : "infinitive"}
        </Text>
        <Button title='new entry' style={styles.button} onPress={() => navigation.navigate('Form', {category: category})} />
      </View>
      <Divider />
      {entriesLoading === true ? (
        <>
          <ActivityIndicator size="large" color={Colors.primary} />
        </>
      ) : (
        <FlatList data={entries} renderItem={(entry) => <EntryRow category={category} entry={entry.item} setModalVisible={setModalVisible} setModalEntry={setModalEntry} />} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  tableHeader: {
    flexDirection: 'row',
  },
  title: {
    color: Colors.primary,
    flex: 2,
  },
  button: {
    alignSelf: 'center',
  },
});

export default EntryList;
