import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import Slider from "@react-native-community/slider"
import Spacing from "../Spacing"

const PriceRangeSlider = ({ min = 0, max = 50000, step = 1000, onChange, label }) => {

  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)

  const handleMinChange = (value) => {
    setMinPrice(value)
    if (value >= maxPrice) setMaxPrice(value + step)
    onChange && onChange(value, maxPrice)
  }

  const handleMaxChange = (value) => {
    setMaxPrice(value)
    if (value <= minPrice) setMinPrice(value - step)
    onChange && onChange(minPrice, value)
  }

  return (
    <View style={styles.container}>
        { label && <Text style={styles.label}>{label}</Text> }
        <Spacing type={'small'} />
      {/* Min Price Slider */}
      <Text style={styles.sliderLabel}>الحد الأدنى</Text>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={maxPrice - step} // Prevent overlap
        step={step}
        value={minPrice}
        onValueChange={handleMinChange}
        minimumTrackTintColor="#007BFF"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#007BFF"
      />

      {/* Max Price Slider */}
      <Text style={styles.sliderLabel}>الحد الأقصى</Text>
      <Slider
        style={styles.slider}
        minimumValue={minPrice + step} // Prevent overlap
        maximumValue={max}
        step={step}
        value={maxPrice}
        onValueChange={handleMaxChange}
        minimumTrackTintColor="#007BFF"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#007BFF"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    direction: 'rtl'
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  sliderLabel: {
    fontSize: 14,
    color: '#333'
  },
  slider: {
    width: "100%",
    height: 20,
  },
})

export default PriceRangeSlider
