import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"

const CustomPicker = ({ label, selectedValue, onValueChange, items, style, errorMessage, enabled=true }) => {
  return (
    <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.pickerContainer}>
        <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, style]}
        enabled={enabled}
        mode="dropdown"
        >
            <Picker.Item label={label} value="" enabled={false} />
            {
              Array.isArray(items) ?
              items.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
              ))
            :
              Object.keys(items).map((itemKey, index) => (
              <Picker.Item key={index} label={items[itemKey]} value={itemKey} />
              ))
            }
        </Picker>
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
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
    color: "#333", 
  },
  errorMessage: {
    color: 'red',
    textAlign: 'right',
    fontWeight: 'bold'
}
})

export default CustomPicker
