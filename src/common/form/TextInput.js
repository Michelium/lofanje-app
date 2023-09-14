import React from "react";
import { View, StyleSheet } from "react-native";
import * as Colors from "../../config/colors";
import { Input, Text } from "@ui-kitten/components";

const TextInput = (props) => {
  const { label, updateFormData, field, value, ...inputProps } = props;
  
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
        value={value}
        textStyle={{ fontWeight: "500" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    justifyContent: "center",
  },
  label: {
    flex: 1,
    color: Colors.secondaryText,
    marginBottom: 3,
  },
  input: {
    flex: 1,
    // backgroundColor: Colors.light_grey,
    // borderColor: "none",
    height: 40,
    borderRadius: 4,
  },
});

export default TextInput;
