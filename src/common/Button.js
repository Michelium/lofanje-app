import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Colors from "../config/colors";

const Button = ({ title, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 30,
    width: 'auto',
  },
  text: {
    color: Colors.text,
  },
});

export default Button;
