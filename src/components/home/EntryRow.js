import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import { AntDesign } from "@expo/vector-icons";

const EntryRow = ({ category, entry, setModalVisible, setModalEntry }) => {
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
        <AntDesign name="eyeo" size={20} color={Colors.primary} />
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
  title: {
    color: Colors.text,
    maxWidth: '90%',
  },
});

export default EntryRow;
