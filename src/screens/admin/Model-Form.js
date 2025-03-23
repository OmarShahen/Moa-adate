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
import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"
import CustomPicker from "../../components/Picker"


const ModelFormScreen = () => {

  const [id, setId] = useState()
  const [name, setName] = useState()
  const [brandId, setBrandId] = useState()
  const [typeId, setTypeId] = useState()

  const [brands, setBrands] = useState([])
  const [types, setTypes] = useState([])

  const [idError, setIdError] = useState()
  const [nameError, setNameError] = useState()
  const [brandIdError, setBrandIdError] = useState()
  const [typeIdError, setTypeIdError] = useState()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    const fetchBrands = async () => {
        try {

            const querySnapshot = await getDocs(collection(db, 'brands'))
            const brandsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                label: doc.data().name,
                value: doc.data().id
            }))

            setBrands(brandsList)

        } catch(error) {
            Alert.alert(error.message)
        }
    }

    fetchBrands()

  }, [])

  useEffect(() => {

    const fetchTypes = async () => {
        try {

            const querySnapshot = await getDocs(collection(db, 'types'))
            const typesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                label: doc.data().name,
                value: doc.data().id
            }))

            setTypes(typesList)

        } catch(error) {
            Alert.alert(error.message)
        }
    }

    fetchTypes()

  }, [])

  const resetForm = () => {
    setId('')
    setName('')
  }


  const handleSubmit = async () => {

    if(!brandId) {
        return setBrandIdError('العلامة التجارية مطلوبة')
    }

    if(!typeId) {
        return setTypeIdError('النوع مطلوب')
    }

    if(!id) {
        return setIdError('المعرف مطلوب')
    }

    if(!name) {
        return setNameError('الاسم مطلوب')
    }

    try {

        setIsLoading(true)
        await addDoc(collection(db, 'models'), {
            id: id.trim(),
            name: name.trim(),
            brandId: brandId.trim(),
            typeId: typeId.trim(),
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
        <Title>اضافة موديل</Title>
        <Spacing type={'medium'} />
        <ScrollView 
        style={{ flex: 1, height: "100%" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >

        <CustomPicker 
        label={'العلامة التجارية'} 
        items={brands}
        selectedValue={brandId}
        onValueChange={(value) => {
            setBrandIdError()
            setBrandId(value)
        }}
        errorMessage={brandIdError}
        />

        <CustomPicker 
        label={'النوع'} 
        items={types}
        selectedValue={typeId}
        onValueChange={(value) => {
            setTypeIdError()
            setTypeId(value)
        }}
        errorMessage={typeIdError}
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

export default ModelFormScreen
