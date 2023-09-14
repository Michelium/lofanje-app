import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import { Foundation } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const EntryRow = ({ category, entry, setModalVisible, setModalEntry }) => {
  const navigation = useNavigation();

  return (
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
          <TouchableOpacity hitSlop={styles.hitSlop} onPress={() => navigation.navigate("Form", { category: category, entry: entry })}>
            <Foundation style={styles.buttonItem} name="pencil" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <Feather style={styles.buttonItem} name="trash-2" size={20} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
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
  },
  buttonItem: {
    paddingLeft: 20,
  },
  title: {
    color: Colors.text,
    maxWidth: "90%",
  },
  hitSlop: {
    top: 25,
    bottom: 25,
    left: 25,
    right: 25,
  }
});

export default EntryRow;
