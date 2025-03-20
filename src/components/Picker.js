import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"

const CustomPicker = ({ label, selectedValue, onValueChange, items, style }) => {
  return (
    <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.pickerContainer}>
        <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, style]}
        >
            {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
        </Picker>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
    textAlign: 'right'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc", // Change this to your desired border color
    borderRadius: 8,
    overflow: "hidden", // Prevents overflow issues
    backgroundColor: "#fff", // Background to match the picker
  },
  picker: {
    width: "100%",
    color: "#333", // Text color
  },
})

export default CustomPicker
