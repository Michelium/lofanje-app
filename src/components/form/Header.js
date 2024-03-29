import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../common/Button";
import * as Colors from "../../config/colors";
import { useNavigation } from '@react-navigation/core';

const Header = ({category, formSubmit}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>category: <Text style={{fontWeight: 600}}>{category}</Text></Text>
      <Button title="cancel" style={styles.button} btnColor={Colors.success} onPress={() => {navigation.goBack()}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.light_background,
    paddingTop: 8,
    paddingBottom: 15,
    // paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 2,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 0,
  },
  button: {
    alignSelf: "center",
  },
  title: {
    color: Colors.text,
    // marginLeft: 10,
  }
});

export default Header;
