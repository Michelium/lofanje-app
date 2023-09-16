import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import Button from "../../common/Button";
import * as Colors from "../../config/colors";
import axiosInstance from "../../helpers/axios-helper";
import { showMessage } from "react-native-flash-message";
import TextInput from "../../common/form/TextInput";
import SelectInput from "../../common/form/SelectInput";
import { useNavigation } from "@react-navigation/core";
import Header from "./Header";

const EntryForm = ({ category, entry }) => {
  const navigation = useNavigation();

  const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState(null);

  const getFields = async () => {
    try {
      const response = await axiosInstance.get(`/fields?category=${category}`);
      setFields(response.data);
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
      let response;
      if (entry) {
        // if entry is defined, use PUT to update
        response = await axiosInstance.put("/entries", data);
      } else {
        // Otherwise, use POST to create a new entry
        response = await axiosInstance.post("/entries", data);
      }

      console.log("Response from server:", response.data);

      showMessage({
        message: entry ? "Entry updated successfully." : "Entry added successfully.",
        type: "success",
      });

      if (entry) {
        navigation.navigate("Home", { category: category });
      }

      // Reset the form after successful submit
      const value = fields.reduce((acc, curr) => {
        acc[curr.name] = null;
        return acc;
      }, {});

      setFormData(value);
    } catch (error) {
      console.error("Error submitting form:", error, data);

      showMessage({ message: "Something went wrong!", type: "danger" });
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    // Fill form data if entry is given so it becomes an update form
    if (entry) {
      const newFormData = {};
      if (fields) {
        newFormData["id"] = entry["id"];
        fields.map((field) => {
          if (entry[camelToSnakeCase(field.name)]) {
            newFormData[field.name] = entry[camelToSnakeCase(field.name)];
          }
        });
      }

      setFormData(newFormData);
    } else {
      setFormData({});
    }
    getFields();
  }, [category, entry]);

  const renderFormField = (field) => {
    const { name, type, label, required, choices } = field;

    if (type === "text") {
      return <TextInput key={name} field={name} label={label} value={formData[name]} updateFormData={updateFormData} required={required} />;
    } else if (type === "choice") {
      return <SelectInput key={name} field={name} label={label} value={formData[name]} updateFormData={updateFormData} choices={choices} />;
    }
    return null;
  };

  const isDataLoaded = fields && !submitLoading;

  return (
    <View style={styles.container}>
      {isDataLoaded ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>
              category: <Text style={{ fontWeight: 600 }}>{category}</Text>
            </Text>
            <Button title="submit" style={styles.button} btnColor={Colors.success} onPress={handleFormSubmit} />
          </View>
          <ScrollView>{fields.map(renderFormField)}</ScrollView>
          <Button
            title="cancel"
            style={styles.backButton}
            btnColor={Colors.success}
            onPress={() => {
              navigation.goBack();
            }}
          />
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
  header: {
    flexDirection: "row",
    backgroundColor: Colors.light_background,
    paddingTop: 8,
    paddingBottom: 15,
    // paddingHorizontal: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: Colors.secondary,
  },
  title: {
    color: Colors.text,
  },
});

export default EntryForm;
