import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Button from "../Button";
import * as Colors from "../../config/colors";

const SpecialCharactersModal = ({ isVisible, onClose, onCharacterClick }) => {
  const specialCharacters = [
    ["ˌ", "ˈ", "ǝ", "ð", "ɛ", "ɣ", "ʒ", "ɲ", "ɔ", "ɾ", "ʃ"],
    ["«", "»", "→", "ç", "æ", "œ"],
    ["Á", "á", "É", "é", "Í", "í", "Ó", "ó", "Ú", "ú"],
  ];

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide" transparent={true}>
      <View style={styles.modalBackdrop}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {specialCharacters.map((row, rowIndex) => (
                <View style={styles.characterRow} key={rowIndex}>
                  {row.map((char, index) => (
                    <Button
                      key={index}
                      title={char}
                      style={styles.button}
                      onPress={() => {
                        onCharacterClick(char);
                        onClose();
                      }}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modalContent: {
    flexWrap: "wrap",
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 10,
    elevation: 5, // Android elevation for shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  characterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  button: {
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
    borderRadius: 4,
    margin: 3,
    width: 50,
    height: 40,
  },
});

export default SpecialCharactersModal;
