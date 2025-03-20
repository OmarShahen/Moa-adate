import React, { useState } from "react"
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Picker } from "@react-native-picker/picker"
import InputField from "../components/InputField"
import Button from "../components/Button"
import Layout from "../components/Layout"
import { Title } from "../components/Typography"
import Spacing from "../components/Spacing"
import CustomPicker from "../components/Picker"


const EquipmentFormScreen = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  // Function to pick images
  const pickImage = async () => {
    if (images.length >= 7) {
      alert("لا يمكنك رفع أكثر من 7 صور")
      return
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1
    })

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]) // Add selected image
    }
  }

  const categoryItems = [
    { label: "اختر تصنيف", value: "" },
    { label: "رافعات", value: "crane" },
    { label: "حفارات", value: "excavator" },
    { label: "شاحنات", value: "truck" },
  ]

  return (
    <Layout>
        <Title>إضافة معدة جديدة</Title>
        <Spacing type={'medium'} />
        <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >

        {/* Title */}
        <InputField
        label={'اسم المعدة'}
        placeholder="أدخل اسم المعدة"
        value={title}
        onChangeText={setTitle}
        />

        {/* Category Picker */}
        <CustomPicker label={'التصنيف'} items={categoryItems} />

        {/* Price */}
        <InputField
        label={'السعر'}
        placeholder="أدخل السعر بالجنيه المصري"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        />

        {/* Description */}
        <InputField
            label={'الوصف'}
            placeholder="أدخل وصف المعدة"
            value={description}
            onChangeText={setDescription}
            multiline={true}
        />
        <Spacing type={'medium'} />
        <Button title="تحميل الصور (7 صور كحد أقصى)" onPress={pickImage} />
        <Spacing type={'medium'} />
        {/* Images Preview at the Top */}
        <View style={{ height: 120, marginBottom: 10 }}>
            <FlatList
            nestedScrollEnabled={true}
            data={images}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.image} />
            )}
            />
        </View>
        <Spacing type={'medium'} />
        {/* Submit Button */}
        <Button title={'إضافة المعدة'} />
        </ScrollView>
    </Layout>
  )
}

// Styles
const styles = {
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15
  }
}

export default EquipmentFormScreen
