import React, { useEffect, useState } from "react"
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet, Alert, Dimensions } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Picker } from "@react-native-picker/picker"
import InputField from "../components/InputField"
import Button from "../components/Button"
import Layout from "../components/Layout"
import { Title } from "../components/Typography"
import Spacing from "../components/Spacing"
import CustomPicker from "../components/Picker"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../services/firebaseConfig"
import { EGYPT_CITIES, EQUIPMENT_CONDITION, FUEL_TYPES } from "../utils/values"
import { isManufactureYearValid, isNumber, isPriceValid } from "../utils/validations"
import { ActivityIndicator } from "react-native-paper"
import { COLORS } from "../components/Colors"
import ProgressBar from "react-native-progress/Bar"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


const EquipmentFormScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false)

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])

  const [categoryId, setCategoryId] = useState()
  const [categoryName, setCategoryName] = useState()
  const [subcategoryId, setSubcategoryId] = useState()
  const [subcategoryName, setSubcategoryName] = useState() 
  const [typeId, setTypeId] = useState()
  const [typeName, setTypeName] = useState()
  const [brandId, setBrandId] = useState()
  const [brandName, setBrandName] = useState()
  const [modelId, setModelId] = useState()
  const [modelName, setModelName] = useState()
  const [manufactureYear, setManufactureYear] = useState()
  const [rentalPricePerHour, setRentalPricePerHour] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState('EGYPT')
  const [weight, setWeight] = useState()
  const [weightUnit, setWeightUnit] = useState('TON')
  const [fuelType, setFuelType] = useState()
  const [enginePower, setEnginePower] = useState()
  const [enginePowerUnit, setEnginePowerUnit] = useState('HP')
  const [maxCapacity, setMaxCapacity] = useState()
  const [maxCapacityUnit, setMaxCapacityUnit] = useState('TON')
  const [dimensions, setDimensions] = useState('')
  const [hoursUsed, setHoursUsed] = useState()
  const [condition, setCondition] = useState()
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('AVAILABLE')
  const [contactNumber, setContactNumber] = useState()

  const [categoryIdError, setCategoryIdError] = useState()
  const [subcategoryIdError, setSubcategoryIdError] = useState()
  const [typeIdError, setTypeIdError] = useState()
  const [brandIdError, setBrandIdError] = useState()
  const [modelIdError, setModelIdError] = useState()
  const [manufactureYearError, setManufactureYearError] = useState()
  const [rentalPricePerHourError, setRentalPricePerHourError] = useState()
  const [cityError, setCityError] = useState()
  const [countryError, setCountryError] = useState()
  const [weightError, setWeightError] = useState()
  const [weightUnitError, setWeightUnitError] = useState()
  const [fuelTypeError, setFuelTypeError] = useState()
  const [enginePowerError, setEnginePowerError] = useState()
  const [enginePowerUnitError, setEnginePowerUnitError] = useState()
  const [maxCapacityError, setMaxCapacityError] = useState()
  const [maxCapacityUnitError, setMaxCapacityUnitError] = useState()
  const [dimensionsError, setDimensionsError] = useState()
  const [hoursUsedError, setHoursUsedError] = useState()
  const [hoursUsedUnitError, setHoursUsedUnitError] = useState()
  const [conditionError, setConditionError] = useState()
  const [descriptionError, setDescriptionError] = useState()
  const [imagesError, setImagesError] = useState([])
  const [statusError, setStatusError] = useState()
  const [contactNumberError, setContactNumberError] = useState()

  const [images, setImages] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})
  const [downloadURLs, setDownloadURLs] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isImagesUploaded, setIsImagesUploaded] = useState(false)
  

  useEffect(() => {

    const fetchCategories = async () => {
      try {

        const querySnapshot = await getDocs(collection(db, 'categories'))
        const categoryList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          label: doc.data().name,
          value: doc.data().id
        }))

        setCategories(categoryList)

      } catch(error) {
        console.error(error.message)
        Alert.alert(error.message)
      }
    }

    fetchCategories()

  }, [])

  useEffect(() => {

    if(!categoryId) {
      return
    }

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

    fetchSubcategories()

  }, [categoryId])

  useEffect(() => {

    if(!subcategoryId) {
      return
    }

    const fetchTypes = async () => {

      try {

        setTypeId()
        const typesRef = collection(db, 'types')
        const q = query(typesRef, where('subcategoryId', '==', subcategoryId))
        const querySnapshot = await getDocs(q)
        const typesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          label: doc.data().name,
          value: doc.data().id
        }))

        setTypes(typesList)

      } catch(error) {
        console.error(error.message)
        Alert.alert(error.message)
      }
    }

    fetchTypes()

  }, [subcategoryId])

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
        console.error(error)
        Alert.alert(error.message)
      }
    }

    fetchBrands()

  }, [])

  useEffect(() => {

    if(!typeId || !brandId) {
      return
    }

    const fetchModels = async () => {

      try {

        setModelId()
        const modelsRef = collection(db, 'models')
        const q = query(modelsRef, where('typeId', '==', typeId), where('brandId', '==', brandId))
        const querySnapshot = await getDocs(q)
        const modelsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          label: doc.data().name,
          value: doc.data().id
        }))

        setModels(modelsList)

      } catch(error) {
        console.error(error.message)
        Alert.alert(error.message)
      }
      
    }

    fetchModels()

  }, [typeId, brandId])

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

  const removeImage = (imageURL) => {
    setImages(images.filter(image => image !== imageURL))
  }

  const isDataValid = () => {

    if(!categoryId) {
      Alert.alert('الفئة مطلوبة')
      setCategoryIdError('الفئة مطلوبة')
      return false
    }

    if(!subcategoryId) {
      Alert.alert('الفئة الفرعية مطلوبة')
      setSubcategoryIdError('الفئة الفرعية مطلوبة')
      return false
    }

    if(!typeId) {
      Alert.alert('النوع مطلوب')
      setTypeIdError('النوع مطلوب')
      return false
    }

    if(!brandId) {
      Alert.alert('العلامة التجارية مطلوبة')
      setBrandIdError('العلامة التجارية مطلوبة')
      return false
    }

    if(!modelId) {
      Alert.alert('الموديل مطلوب')
      setModelIdError('الموديل مطلوب')
      return false
    }

    if(!manufactureYear) {
      Alert.alert('سنة التصنيع مطلوبة')
      setManufactureYearError('سنة التصنيع مطلوبة')
      return false
    }

    if(!isManufactureYearValid(parseInt(manufactureYear))) {
      Alert.alert('يرجى إدخال سنة صالحة')
      setManufactureYearError('يرجى إدخال سنة صالحة')
      return false
    }

    if(!rentalPricePerHour) {
      Alert.alert('سعر الايجار في الساعة مطلوبة')
      setRentalPricePerHourError('سعر الايجار في الساعة مطلوبة')
      return false
    }

    if(!isPriceValid(parseFloat(rentalPricePerHour))) {
      Alert.alert('يرجي إدخال سعر الايجار صحيح')
      setRentalPricePerHourError('يرجي إدخال سعر الايجار صحيح')
      return false
    }

    if(!city) {
      Alert.alert('المدينة مطلوبة')
      setCityError('المدينة مطلوبة')
      return false
    }

    if(weight && !isNumber(weight)) {
      Alert.alert('الوزن يجب ان يكون رقم')
      setWeightError('الوزن يجب ان يكون رقم')
      return false
    }

    if(!fuelType) {
      Alert.alert('نوع الوقود مطلوب')
      setFuelTypeError('نوع الوقود مطلوب')
      return false
    }

    if(enginePower && !isNumber(enginePower)) {
      Alert.alert('قدرة المحرك يجب ان يكون رقم')
      setEnginePowerError('قدرة المحرك يجب ان يكون رقم')
      return false
    }

    if(maxCapacity && !isNumber(maxCapacity)) {
      Alert.alert('السعة القصوي يجب ان يكون رقم')
      setMaxCapacityError('السعة القصوي يجب ان يكون رقم')
      return false
    }

    if(hoursUsed && !isNumber(hoursUsed)) {
      Alert.alert('عدد ساعات التشغيل يجب ان يكون رقم')
      setHoursUsedError('عدد ساعات التشغيل يجب ان يكون رقم')
      return false
    }

    if(!condition) {
      Alert.alert('حالة المعدة مطلوبة')
      setConditionError('حالة المعدة مطلوبة')
      return false
    }

    if(!contactNumber) {
      Alert.alert('رقم الهاتف للتواصل مطلوب')
      setContactNumberError('رقم الهاتف للتواصل مطلوب')
      return false
    }

    if(!/^\d{11}$/.test(contactNumber)) {
      Alert.alert('رقم الهاتف للتواصل يجب ان يكون 11 رقم')
      setContactNumberError('رقم الهاتف للتواصل يجب ان يكون 11 رقم')
      return false
    }

    return true
  }

  const uploadImages = async () => {

    if(!isDataValid()) {
      return
    }

    if (images.length === 0) {
      alert("يرجى اختيار الصور أولاً")
      return
    }

    setIsUploading(true)
    setIsLoading(true)
    const storage = getStorage()
    const urls = []

    for (let i = 0; i < images.length; i++) {
      const uri = images[i]
      const fileName = `equipment_${Date.now()}_${i}.jpg`
      const storageRef = ref(storage, `equipments/${fileName}`)

      const response = await fetch(uri)
      const blob = await response.blob()

      const uploadTask = uploadBytesResumable(storageRef, blob)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          setUploadProgress((prev) => ({ ...prev, [uri]: progress }));
        },
        (error) => {
          alert("حدث خطأ أثناء الرفع: " + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          urls.push(downloadURL)

          if (urls.length === images.length) {
            await handleSubmit(urls)
            //setDownloadURLs(urls)
            alert("تم رفع جميع الصور بنجاح!")
            setIsUploading(false)
            //setIsImagesUploaded(true)
          }
        }
      )
    }
  }

  const handleSubmit = async (imagesURLs) => {

    const equipmentData = {
      categoryId,
      categoryName,
      subcategoryId,
      subcategoryName,
      typeId,
      typeName,
      brandId,
      brandName,
      modelId,
      modelName,
      manufactureYear,
      rentalPricePerHour: parseFloat(rentalPricePerHour),
      city,
      country,
      weight: parseFloat(weight),
      weightUnit,
      fuelType,
      enginePower: parseFloat(enginePower),
      enginePowerUnit,
      maxCapacity: parseFloat(maxCapacity),
      maxCapacityUnit,
      dimensions,
      hoursUsed: parseInt(hoursUsed),
      condition,
      description,
      status: 'AVAILABLE',
      contactNumber,
      imagesURLs,
      createdAt: new Date()
    }

    try {

      setIsLoading(true)
      const newEquipment = await addDoc(collection(db, 'equipments'), equipmentData)
      setIsLoading(false)
      navigation.navigate('Equipment', { id: newEquipment.id })

    } catch(error) {
      setIsLoading(false)
      console.error(error.message)
      alert(error.message)
    }

  }


  return (
    <Layout>
        <Title>إضافة اعلان معدة</Title>
        <Spacing type={'medium'} />
        <ScrollView 
        style={{ flex: 1 }}
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
              const targetCategoryList = categories.filter(category => category.value === value)
              const targetCategoryName = targetCategoryList[0].label
              setCategoryName(targetCategoryName)
          }}
          errorMessage={categoryIdError}
          />

          <CustomPicker 
          label={'الفئة الفرعية'} 
          items={subcategories}
          selectedValue={subcategoryId}
          onValueChange={(value) => {
              setSubcategoryIdError()
              setSubcategoryId(value)
              const targetSubcategoryList = subcategories.filter(subcategory => subcategory.value === value)
              const targetSubcategoryName = targetSubcategoryList[0].label
              setSubcategoryName(targetSubcategoryName)
          }}
          errorMessage={subcategoryIdError}
          />

        <CustomPicker 
        label={'النوع'} 
        items={types}
        selectedValue={typeId}
        onValueChange={(value) => {
            setTypeIdError()
            setTypeId(value)
            const targetTypeList = types.filter(type => type.value === value)
            const targetTypeName = targetTypeList[0].label
            setTypeName(targetTypeName)
        }}
        errorMessage={typeIdError}
        />

        <CustomPicker 
        label={'العلامة التجارية'} 
        items={brands}
        selectedValue={brandId}
        onValueChange={(value) => {
            setBrandIdError()
            setBrandId(value)
            const targetBrandList = brands.filter(brand => brand.value === value)
            const targetBrandName = targetBrandList[0].label
            setBrandName(targetBrandName)
        }}
        errorMessage={brandIdError}
        />

        <CustomPicker 
        label={'الموديل'} 
        items={models}
        selectedValue={modelId}
        onValueChange={(value) => {
            setModelIdError()
            setModelId(value)
            const targetModelList = models.filter(model => model.value === value)
            const targetModelName = targetModelList[0].label
            setModelName(targetModelName)
        }}
        errorMessage={modelIdError}
        />

        <InputField
        label={'سنة التصنيع'}
        placeholder={'سنة التصنيع'}
        keyboardType={'phone-pad'}
        value={manufactureYear}
        onChangeText={(value) => setManufactureYear(value)}
        onPress={() => setManufactureYearError()}
        errorMessage={manufactureYearError}
        />

        <InputField
        label={'سعر الايجار في الساعة'}
        placeholder={'سعر الايجار في الساعة'}
        keyboardType={'decimal-pad'}
        value={rentalPricePerHour}
        onChangeText={(value) => setRentalPricePerHour(value)}
        onPress={() => setRentalPricePerHourError()}
        errorMessage={rentalPricePerHourError}
        />

        <InputField
        label={'البلد'}
        keyboardType={'decimal-pad'}
        value={'مصر'}
        editable={false}
        />

        <CustomPicker 
        label={'المدينة'} 
        items={EGYPT_CITIES}
        selectedValue={city}
        onValueChange={(value) => {
            setCityError()
            setCity(value)
        }}
        errorMessage={cityError}
        />

        <InputField
        label={'الوزن (طن)'}
        placeholder={'الوزن (طن)'}
        keyboardType={'decimal-pad'}
        value={weight}
        onChangeText={(value) => setWeight(value)}
        onPress={() => setWeightError()}
        errorMessage={weightError}
        />

        <CustomPicker 
        label={'نوع الوقود'} 
        items={FUEL_TYPES}
        selectedValue={fuelType}
        onValueChange={(value) => {
            setFuelTypeError()
            setFuelType(value)
        }}
        errorMessage={fuelTypeError}
        />

        <InputField
        label={'قدرة المحرك (hp)'}
        placeholder={'قدرة المحرك (hp)'}
        keyboardType={'decimal-pad'}
        value={enginePower}
        onChangeText={(value) => setEnginePower(value)}
        onPress={() => setEnginePowerError()}
        errorMessage={enginePowerError}
        />

        <InputField
        label={'السعة القصوى (طن)'}
        placeholder={'السعة القصوى (طن)'}
        keyboardType={'decimal-pad'}
        value={maxCapacity}
        onChangeText={(value) => setMaxCapacity(value)}
        onPress={() => setMaxCapacityError()}
        errorMessage={maxCapacityError}
        />

        <InputField
        label={'الابعاد'}
        placeholder={'الابعاد (10m x 3m x 4m)'}
        value={dimensions}
        onChangeText={(value) => setDimensions(value)}
        onPress={() => setDimensionsError()}
        errorMessage={dimensionsError}
        />

        <InputField
        label={'عدد ساعات التشغيل'}
        placeholder={'عدد ساعات التشغيل'}
        keyboardType={'decimal-pad'}
        value={hoursUsed}
        onChangeText={(value) => setHoursUsed(value)}
        onPress={() => setHoursUsedError()}
        errorMessage={hoursUsedError}
        />

        <CustomPicker 
        label={'حالة المعدة'} 
        items={EQUIPMENT_CONDITION}
        selectedValue={condition}
        onValueChange={(value) => {
            setConditionError()
            setCondition(value)
        }}
        errorMessage={conditionError}
        />

        <InputField
            label={'الوصف'}
            placeholder="أدخل وصف المعدة"
            value={description}
            onChangeText={setDescription}
            multiline={true}
        />

        <InputField
        label={'رقم الهاتف للتواصل'}
        placeholder={'رقم الهاتف للتواصل'}
        keyboardType={'phone-pad'}
        value={contactNumber}
        onChangeText={(value) => setContactNumber(value)}
        onPress={() => setContactNumberError()}
        errorMessage={contactNumberError}
        />

        <Spacing type={'medium'} />
        <Button title="تحميل الصور (7 صور كحد أقصى)" onPress={pickImage} />
        <Spacing type={'medium'} />
        {/* Images Preview at the Top */}
        <View style={{ height: 180, marginBottom: 10 }}>
            <FlatList
            nestedScrollEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.imageProgressContainer}>
                <Image source={{ uri: item }} style={styles.image} />
                {isUploading ? (
                  <ProgressBar
                  progress={uploadProgress[item]}
                  height={8}
                  color={COLORS.PRIMARY}
                  borderRadius={5}
                  style={{ marginTop: 5 }}
                  />
                )
              :
              isImagesUploaded ?
                null
                :
                <Button 
                title={'مسح الصورة'} 
                style={{ backgroundColor: 'grey' }} 
                onPress={() => removeImage(item)}
                />
              }
                </View>
            )}
            />
        </View>
        <Spacing type={'medium'} />
        {/*
          isUploading ?
          <ActivityIndicator size={24} color={COLORS.PRIMARY} />
          :
          <Button 
          title={'رفع الصور'} 
          onPress={uploadImages}
          />
        */}
        <Spacing type={'medium'} />
        {
          isLoading ?
          <ActivityIndicator size={24} color={COLORS.PRIMARY} />
          :
          <Button 
          title={'إضافة المعدة'} 
          onPress={uploadImages}
          />
        }
        </ScrollView>
    </Layout>
  )
}

// Styles
const styles = StyleSheet.create({
  formWrapper: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC'
  },
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
  },
  imageProgressContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2
  }
})

export default EquipmentFormScreen
