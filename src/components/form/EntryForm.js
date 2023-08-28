import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Button from "../../common/Button";
import * as Colors from "../../config/colors";
import FormRow from "./FormRow";
import axiosInstance from "../../helpers/axios-helper";
import { showMessage, hideMessage } from 'react-native-flash-message';

const EntryForm = ({ category }) => {
  const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState(null);
  const [humanFields, setHumanFields] = useState(null);  

  const getFields = async () => {
    try {
      const response = await axiosInstance.get(`/fields?category=${category}`);
      const responseHumanReadable = await axiosInstance.get(`/fields?category=${category}&human_readable=1`);
      
      setFields(response.data);
      setHumanFields(responseHumanReadable.data);
  
      const value = response.data.reduce((acc, curr) => {
        acc[curr] = null;
        return acc;
      }, {});
      
      setFormData(value);
      // console.log(fields);
      // console.log(humanFields);
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFormSubmit = async () => {
    const allFieldsNull = Object.values(formData).every(value => value === null);

    if (allFieldsNull) {
      showMessage({
        message: 'Please fill in the form fields.',
        type: 'danger',
      });
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
      ...convertedData,   // Spread the converted data
    };

    try {
      const response = await axiosInstance.post("/entries", data);
      console.log("Response from server:", response.data);

      showMessage({
        message: 'Entry added successfully.',
        type: 'success',
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      showMessage({
        message: 'Something went wrong!',
        type: 'danger',
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    setFormData({});
    getFields();
  }, [category]);

  return (
    <View style={styles.container}>
      {fields !== null && humanFields !== null && submitLoading === false ? (
        <>
          <ScrollView>
            {fields.map((field, iteration) => {
              return <FormRow label={humanFields[iteration]} updateFormData={updateFormData} key={iteration} field={field} />;
            })}
          </ScrollView>
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
  input: {
    backgroundColor: Colors.light_grey,
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  label: {
    color: Colors.primary,
    margin: 20,
    marginLeft: 0,
  },
});

export default EntryForm;
