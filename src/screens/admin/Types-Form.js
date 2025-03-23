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
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"
import CustomPicker from "../../components/Picker"


const TypesFormScreen = () => {

  const [id, setId] = useState()
  const [name, setName] = useState()
  const [categoryId, setCategoryId] = useState()
  const [subcategoryId, setSubcategoryId] = useState()

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])

  const [idError, setIdError] = useState()
  const [nameError, setNameError] = useState()
  const [categoryIdError, setCategoryIdError] = useState()
  const [subcategoryIdError, setSubcategoryIdError] = useState()

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

  useEffect(() => {

    const fetchSubcategories = async () => {
        try {

            setSubcategoryId()
            const subcategoriesRef = collection(db, 'subcategories')
            const q = query(subcategoriesRef, where('categoryId', '==', categoryId))
            const querySnapshot = await getDocs(q)
            const subcategoriesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                label: doc.data().name,
                value: doc.data().id
            }))

            setSubcategories(subcategoriesList)

        } catch(error) {
            console.error(error.message)
            Alert.alert(error.message)
        }
    }

    if(categoryId) {
        fetchSubcategories()
    }
    

  }, [categoryId])

  const resetForm = () => {
    setId('')
    setName('')
    setCategoryId('')
    setSubcategoryId('')
  }


  const handleSubmit = async () => {

    if(!categoryId) {
        return setCategoryIdError('الفئة مطلوبة')
    }

    if(!subcategoryId) {
        return setSubcategoryIdError('الفئة الفرعية مطلوبة')
    }

    if(!id) {
        return setIdError('المعرف مطلوب')
    }

    if(!name) {
        return setNameError('الاسم مطلوب')
    }

    try {

        setIsLoading(true)
        await addDoc(collection(db, 'types'), {
            id: id.trim(),
            name: name.trim(),
            subcategoryId: subcategoryId.trim(),
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
        <Title>اضافة نوع</Title>
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

        <CustomPicker 
        label={'الفئة الفرعية'} 
        items={subcategories}
        selectedValue={subcategoryId}
        onValueChange={(value) => {
            setSubcategoryIdError()
            setSubcategoryId(value)
        }}
        errorMessage={subcategoryIdError}
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

export default TypesFormScreen
