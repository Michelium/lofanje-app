import React from "react";
import { Input } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import * as Colors from "../../config/colors";
import { FontAwesome5 } from '@expo/vector-icons'; 

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Input style={styles.input} placeholder="global search" autoCapitalize="none" returnKeyType="search" textStyle={{fontWeight: '500'}} accessoryLeft={<FontAwesome5 name="search" size={22} color={Colors.primary} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    minHeight: 50,
  },
  input: {
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
  },
});

export default SearchBar;
