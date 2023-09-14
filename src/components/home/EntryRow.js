import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Colors from "../../config/colors";
import { Foundation } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axiosInstance from "../../helpers/axios-helper";
import Dialog from "react-native-dialog";
import { showMessage, hideMessage } from "react-native-flash-message";

const EntryRow = ({ category, entry, setModalVisible, setModalEntry, reloadList }) => {
  const navigation = useNavigation();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleDeletePress = (id) => {
    deleteEntry(id); // Actual deleting of the entry
    setDeleteDialogVisible(false); // Close the dialog after deleting
  };

  const deleteEntry = async (id) => {
    try {
      response = await axiosInstance.delete(`/entries/${id}`);

      console.log("Response from server:", response);

      showMessage({
        message: "entry deleted successfully",
        type: "success",
      });
      reloadList();
    } catch (error) {
      console.error("Error submitting form:", error);

      showMessage({ message: "Something went wrong!", type: "danger" });
    }
  };

  return (
    <>
      <Dialog.Container visible={deleteDialogVisible} contentStyle={styles.dialogContainer}>
        <Dialog.Title style={styles.dialogTitle}>Delete entry</Dialog.Title>
        <Dialog.Description style={styles.dialogDescription}>
          <Text style={styles.dialogEntryDescription}>
            {category !== "verbs" ? entry.base_form : entry.infinitive} {"\n"}
          </Text>
        </Dialog.Description>
        <Dialog.Button label="Cancel" style={styles.dialogButton} onPress={() => setDeleteDialogVisible(false)} />
        <Dialog.Button label="Delete" style={styles.dialogButton} onPress={() => handleDeletePress(entry.id)} />
      </Dialog.Container>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setModalEntry(entry);
        }}
      >
        <View style={styles.container}>
          <Text category="p1" style={styles.title}>
            {category !== "verbs" ? entry.base_form : entry.infinitive}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonItem} hitSlop={styles.hitSlop} onPress={() => navigation.navigate("Form", { category: category, entry: entry })}>
              <Foundation name="pencil" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonItem} hitSlop={styles.hitSlop} onPress={() => setDeleteDialogVisible(true)}>
              <Feather name="trash-2" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 13,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  buttonItem: {
    paddingHorizontal: 15,
  },
  title: {
    color: Colors.text,
    maxWidth: "80%",
  },
  hitSlop: {
    top: 25,
    bottom: 25,
    left: 0,
    right: 0,
  },
  dialogContainer: {
    backgroundColor: Colors.card,
  },
  dialogTitle: {
    color: Colors.text,
  },
  dialogDescription: {
    color: Colors.secondary,
  },
  dialogButton: {
    color: Colors.buttonBackground,
  },
});

export default EntryRow;
