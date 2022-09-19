import { Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Divider from "../../common/Divider";
import * as Colors from "../../config/colors";
import { AntDesign } from '@expo/vector-icons'; 

const EntryRow = ({ category, entry }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text category="p1" style={styles.title}>
          {category !== 'verbs' ? entry.base_form : entry.infinitive}
        </Text>
        <AntDesign name="eyeo" size={20} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 13,
  },
  title: {
    color: Colors.dark,
  },
});

export default EntryRow;
