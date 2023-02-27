import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, SafeAreaView, Dimensions } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import { AntDesign } from "@expo/vector-icons";
import Button from "../../common/Button";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

const WIDTH_MODAL = Dimensions.get("window").width - 80;
const HEIGHT_MODAL = Dimensions.get("window").height - 400;

const EntryModal = ({ entry, setModalVisible, modalVisible }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{entry.category !== "verbs" ? entry.base_form : entry.infinitive}</Text>
          </View>
          <Divider />
          <View style={styles.body}>
            <FlatList />
            <Button
              onPress={() => setModalVisible(false)}
              title="close"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light_background,
    borderColor: Colors.light_grey,
    borderWidth: 3,
    borderRadius: 8,
    width: WIDTH_MODAL,
    height: HEIGHT_MODAL,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  body: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "500",
  },
  closeButton: {
    alignSelf: "center",
  },
});

export default EntryModal;
