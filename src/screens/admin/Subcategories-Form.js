import { useEffect, useState } from "react"
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
import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"
import CustomPicker from "../../components/Picker"


const SubcategoriesFormScreen = () => {

  const [id, setId] = useState()
  const [name, setName] = useState()
  const [categoryId, setCategoryId] = useState()

  const [categories, setCategories] = useState([])

  const [idError, setIdError] = useState()
  const [nameError, setNameError] = useState()
  const [categoryIdError, setCategoryIdError] = useState()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    const fetchCategories = async () => {
        try {

            const querySnapshot = await getDocs(collection(db, 'categories'))
            const categoriesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                label: doc.data().name,
                value: doc.data().id
            }))

            setCategories(categoriesList)

        } catch(error) {
            Alert.alert(error.message)
        }
    }

    fetchCategories()

  }, [])

  const resetForm = () => {
    setId('')
    setName('')
  }


  const handleSubmit = async () => {

    if(!categoryId) {
        return setCategoryIdError('الفئة مطلوبة')
    }

    if(!id) {
        return setIdError('المعرف مطلوب')
    }

    if(!name) {
        return setNameError('الاسم مطلوب')
    }

    try {

        setIsLoading(true)
        await addDoc(collection(db, 'subcategories'), {
            id: id.trim(),
            name: name.trim(),
            categoryId: categoryId.trim(),
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
        <Title>اضافة فئة فرعية</Title>
        <Spacing type={'medium'} />
        <ScrollView 
        style={{ flex: 1, height: "100%" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >

        <CustomPicker 
        label={'الفئة'} 
        items={categories}
        selectedValue={categoryId}
        onValueChange={(value) => {
            setCategoryIdError()
            setCategoryId(value)
        }}
        errorMessage={categoryIdError}
        enabled={categories.length ? true : false}
        />

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

export default SubcategoriesFormScreen
