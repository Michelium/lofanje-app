import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as Colors from "../../config/colors";
import axiosInstance from "../../helpers/axios-helper";

const CategorySelector = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]);

  const getEntries = async () => {
    try {
      const response = await axiosInstance.get(`/categories`);
      setCategories(response.data);
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  const Item = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        setCategory(title);
      }}
    >
      <View style={[styles.item, category == title ? styles.itemActive : styles.item]}>
        <Text style={[styles.title, category == title ? styles.titleActive : styles.title]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item title={item} />;

  return (
    <View style={styles.container}>
      <FlatList style={{ paddingLeft: 11 }} showsHorizontalScrollIndicator={false} horizontal data={categories} renderItem={renderItem} keyExtractor={(category) => category} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light_background,
  },
  item: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginHorizontal: 5,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: Colors.dark_grey,
  },
  itemActive: {
    backgroundColor: Colors.dark,
  },
  title: {
    fontSize: 16,
    color: Colors.dark_grey,
  },
  titleActive: {
    color: Colors.white,
  },
});

export default CategorySelector;
