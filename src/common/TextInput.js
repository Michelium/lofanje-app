import React from "react";
import { View, StyleSheet } from "react-native";
import * as Colors from "../config/colors";
import { Input, Text } from "@ui-kitten/components";

const TextInput = (props) => {
  const { label, updateFormData, field, ...inputProps } = props;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}:</Text>}
      <Input
        {...inputProps}
        style={styles.input}
        onChangeText={(input) => {
          updateFormData(field, input);
        }}
        autoCapitalize="none"
        returnKeyType="default"
        textStyle={{ fontWeight: "500" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: Colors.dark,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.light_grey,
    borderColor: "none",
    height: 40,
    borderRadius: 4,
  },
});

export default TextInput;
