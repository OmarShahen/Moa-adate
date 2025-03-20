import { useState } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native"
import InputField from "../InputField"
import { BodyText, Subtitle, Title } from "../Typography"
import Spacing from "../Spacing"
import CustomPicker from "../Picker"
import PriceRangeSlider from "../sliders/Price"


const FilterModal = ({ visible, onClose, onApply }) => {
    

    const categoryItems = [
        { label: "اختر تصنيف", value: "" },
        { label: "رافعات", value: "crane" },
        { label: "حفارات", value: "excavator" },
        { label: "شاحنات", value: "truck" },
    ]
    
      const dateYears = [
        { label: "2025", value: "2025" },
        { label: "2024", value: "2024" },
        { label: "2023", value: "2023" },
        { label: "2022", value: "2022" },
      ]

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [minPrice, setMinPrice] = useState(5000)
    const [maxPrice, setMaxPrice] = useState(30000)

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, marginHorizontal: 16 }}>
          <Subtitle>البحث</Subtitle>
          <Spacing type="medium" />
          {/* Search Input */}
          <InputField
            label={'ابحث عن المعدات'}
            placeholder="ابحث عن المعدات..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Category Filter */}
          <CustomPicker label={'التصنيف'} items={categoryItems} />

          <CustomPicker label={'التاريخ'} items={dateYears} />

          <View>
            <PriceRangeSlider
            label={'السعر'}
                min={0}
                max={50000}
                step={1000}
                onChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
                }}
            />
            <BodyText>السعر المختار: من {minPrice} EGP إلى {maxPrice} EGP</BodyText>
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
            <TouchableOpacity onPress={onClose} style={{ padding: 10 }}>
              <Text style={{ color: "red" }}>إلغاء</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => onApply({ searchQuery, selectedCategory })} 
              style={{ padding: 10 }}
            >
              <Text style={{ color: "blue" }}>تطبيق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal
