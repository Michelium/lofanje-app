import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as Colors from "../../config/colors";

const data = [
  { id: "nouns", title: "nouns" },
  { id: "adjectives", title: "adjectives" },
  { id: "toponyms", title: "toponyms" },
  { id: "demonyms", title: "demonyms" },
  { id: "verbs", title: "verbs" },
  { id: "articles", title: "articles" },
  { id: "pronouns", title: "pronouns" },
];

const CategorySelector = ({ category, setCategory }) => {
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

  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <FlatList style={{paddingLeft: 11}} showsHorizontalScrollIndicator={false} horizontal data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
