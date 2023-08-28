import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import * as Colors from "../../config/colors";
import { Select, SelectItem, Text } from "@ui-kitten/components";

const SelectInput = (props) => {
  const { label, updateFormData, field, choices, ...inputProps } = props;

  if (choices === undefined) return null;

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}:</Text>}
      <Select
        {...inputProps}
        // selectedIndex={selectedIndex}
        onSelect={(event) => {
          updateFormData(field, Object.keys(choices)[event.row])
        }}
        textStyle={{ fontWeight: "500" }}
      >
        {Object.entries(choices).map(([choiceValue, choiceLabel]) => {
          return (<SelectItem key={choiceValue} title={choiceLabel} />);
        })}
      </Select>
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
    color: Colors.dark,
    marginBottom: 3,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.light_grey,
    borderColor: "none",
    height: 40,
    borderRadius: 4,
  },
});

export default SelectInput;
