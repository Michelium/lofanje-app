import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Colors from "../../config/colors";
import TextInput from "../../common/TextInput";

const FormRow = ({updateFormData, label, field}) => {

  return (
    <View style={styles.container}>
        <TextInput label={label} updateFormData={updateFormData} field={field}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
  },
});

export default FormRow;
