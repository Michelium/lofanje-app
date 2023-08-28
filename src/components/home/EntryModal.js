import { Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import Button from "../../common/Button";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

const WIDTH_MODAL = Dimensions.get("window").width - 80;
const HEIGHT_MODAL = Dimensions.get("window").height - 200;

const EntryModal = ({ entry, setModalVisible, fields }) => {
  const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{entry.category !== "verbs" ? entry.base_form : entry.infinitive}</Text>
          </View>
          <Divider />
          <View style={styles.body}>
            <ScrollView>
              <TouchableWithoutFeedback>
                {fields.map((field) => {
                  console.log(field, entry);
                  return (
                    <View style={styles.fieldRow} key={field.name}>
                      <Text style={styles.label}>{field.label}:</Text>
                      <Text>{entry[camelToSnakeCase(field.name)]}</Text>
                    </View>
                  );
                })}
              </TouchableWithoutFeedback>
            </ScrollView>
            <Button onPress={() => setModalVisible(false)} title="close" style={styles.button} />
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
  fieldRow: {
    marginBottom: 10,
  },
  label: {
    color: Colors.dark_grey,
    fontSize: 15,
  },
});

export default EntryModal;
