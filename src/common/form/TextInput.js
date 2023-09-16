import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Colors from "../../config/colors";
import { Input, Text } from "@ui-kitten/components";
import SpecialCharactersModal from "./SpecialCharactersModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TextInput = (props) => {
  const { label, updateFormData, field, value, ...inputProps } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleCharacterClick = (character) => {
    setInputValue((prevInputValue) => {
      console.log("Previous inputValue:", prevInputValue);
      const inputValue = prevInputValue === undefined || prevInputValue === null ? '' : prevInputValue;
      console.log("Updated inputValue:", inputValue);
      const updatedValue = inputValue + character;
      console.log("Updated value:", updatedValue);
      updateFormData(field, updatedValue);
      return updatedValue;
    });
  };
  

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}:</Text>}
      <View style={styles.inputContainer}>
        <Input
          {...inputProps}
          style={styles.input}
          onChangeText={(input) => {
            setInputValue(input);
            updateFormData(field, input);
          }}
          autoCapitalize="none"
          returnKeyType="default"
          value={inputValue}
          textStyle={{ fontWeight: "500" }}
        />
        <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
          <MaterialCommunityIcons name="format-font" size={19} color={Colors.text} />
        </TouchableOpacity>
      </View>
      <SpecialCharactersModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onCharacterClick={handleCharacterClick} />
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
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    columnGap: 5,
  },
  label: {
    flex: 1,
    color: Colors.secondaryText,
    marginBottom: 3,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 4,
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
    color: "blue", // Change the color as needed
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    width: 35,
    borderRadius: 4,
  },
});

export default TextInput;
