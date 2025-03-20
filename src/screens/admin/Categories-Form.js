import React, { useState } from "react"
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Picker } from "@react-native-picker/picker"
import InputField from "../../components/InputField"
import Button from "../../components/Button"
import Layout from "../../components/Layout"
import { Title } from "../../components/Typography"
import Spacing from "../../components/Spacing"
import { ActivityIndicator } from "react-native-paper"
import { COLORS } from "../../components/Colors"
import { isValidURL } from "../../utils/validations"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"


const CategoriesFormScreen = () => {

  const [id, setId] = useState()
  const [name, setName] = useState()
  const [imageURL, setImageURL] = useState()

  const [idError, setIdError] = useState()
  const [nameError, setNameError] = useState()
  const [imageURLError, setImageURLError] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const resetForm = () => {
    setId('')
    setName('')
    setImageURL('')
  }


  const handleSubmit = async () => {

    if(!id) {
        return setIdError('المعرف مطلوب')
    }

    if(!name) {
        return setNameError('الاسم مطلوب')
    }

    if(!imageURL) {
        return setImageURLError('رابط الصورة مطلوب')
    }

    try {

        setIsLoading(true)
        await addDoc(collection(db, 'categories'), {
            id: id.trim(),
            name: name.trim(),
            imageURL: imageURL.trim(),
            createdAt: new Date()
        })
        setIsLoading(false)
        resetForm()
        Alert.alert('تم التسجيل بنجاح')
    } catch(error) {
        setIsLoading(false)
        Alert.alert(error.message)
    }
  }

  return (
    <Layout>
        <Title>إضافة فئة</Title>
        <Spacing type={'medium'} />
        <ScrollView 
        style={{ flex: 1, height: "100%" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >

        {/* Title */}
        <InputField
        label={'المعرف'}
        placeholder="أدخل المعرف"
        value={id}
        onChangeText={(value) => setId(value)}
        onPress={() => setIdError()}
        errorMessage={idError}
        autoCapitalize="none"
        autoCorrect={false}
        />

        <InputField
        label={'الاسم'}
        placeholder="أدخل الاسم"
        value={name}
        onChangeText={(value) => setName(value)}
        onPress={() => setNameError()}
        errorMessage={nameError}
        />

        <InputField
        label={'رابط الصورة'}
        placeholder="أدخل رابط الصورة"
        value={imageURL}
        onChangeText={(value) => setImageURL(value)}
        onPress={() => setImageURLError()}
        errorMessage={imageURLError}
        />

        <Spacing type={'medium'} />
        {
            isLoading ?
            <ActivityIndicator size={24} color={COLORS.PRIMARY} />
            :
            <Button title={'إضافة'} onPress={handleSubmit} />
        }
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

export default CategoriesFormScreen
