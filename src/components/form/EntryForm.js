import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Button from "../../common/Button";
import * as Colors from "../../config/colors";
import axiosInstance from "../../helpers/axios-helper";
import { showMessage, hideMessage } from "react-native-flash-message";
import TextInput from "../../common/form/TextInput";
import SelectInput from "../../common/form/SelectInput";

const EntryForm = ({ category }) => {
  const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState(null);

  const getFields = async () => {
    try {
      const response = await axiosInstance.get(`/fields?category=${category}`);
      setFields(response.data);

      const value = response.data.reduce((acc, curr) => {
        acc[curr.name] = null;
        return acc;
      }, {});

      setFormData(value);
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.error("Data fetching cancelled");
      } else {
        showMessage({ message: "Something went wrong retrieving the form fields.", type: "danger" });
      }
    }
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFormSubmit = async () => {
    const allFieldsNull = Object.values(formData).every((value) => value === null);

    if (allFieldsNull) {
      showMessage({ message: "Please fill in the form fields.", type: "danger" });
      return;
    }

    setSubmitLoading(true);

    // Convert camal case to snake case for the api
    const convertedData = {};
    for (const key in formData) {
      convertedData[camelToSnakeCase(key)] = formData[key];
    }

    const data = {
      category: category, // Add the current category to the data object
      ...convertedData, // Spread the converted data
    };

    try {
      const response = await axiosInstance.post("/entries", data);
      console.log("Response from server:", response.data);

      showMessage({ message: "Entry added successfully.", type: "success" });

      // Reset the form after successfull submit
      const value = fields.reduce((acc, curr) => {
        acc[curr.name] = null;
        return acc;
      }, {});

      setFormData(value);
    } catch (error) {
      console.error("Error submitting form:", error);

      showMessage({ message: "Something went wrong!", type: "danger" });
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    setFormData({});
    getFields();
  }, [category]);

  const renderFormField = (field) => {
    if (field === null || field === undefined) return null;
    const { name, type, label, required, choices } = field;

    if (type === "text") {
      return <TextInput key={name} field={name} label={label} value={formData[name]} updateFormData={updateFormData}  required={required} />;
    } else if (type === "choice") {
      return <SelectInput key={name} field={name} label={label} value={formData[name]} updateFormData={updateFormData} choices={choices} />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {fields !== null && submitLoading === false ? (
        <>
          <ScrollView>{fields.map((field) => renderFormField(field))}</ScrollView>
          <Button title="submit" onPress={() => handleFormSubmit()} />
        </>
      ) : (
        <ActivityIndicator size="large" color={Colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "center",
  },
});

export default EntryForm;
