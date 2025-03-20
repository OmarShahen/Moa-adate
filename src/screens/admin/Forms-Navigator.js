import React, { useState } from "react"
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Picker } from "@react-native-picker/picker"
import InputField from "../../components/InputField"
import Button from "../../components/Button"
import Layout from "../../components/Layout"
import { Title } from "../../components/Typography"
import Spacing from "../../components/Spacing"
import CustomPicker from "../../components/Picker"
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from "../../components/Colors"



const FormsNavigatorScreen = ({ navigation }) => {


  const categoryItems = [
    { label: "اختر تصنيف", value: "" },
    { label: "رافعات", value: "crane" },
    { label: "حفارات", value: "excavator" },
    { label: "شاحنات", value: "truck" },
  ]

  return (
    <Layout>
        <Title>الاضافات</Title>
        <Spacing type={'large'} />
        <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Categories-Form')}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="grid-outline" size={24} />
                    <Text style={styles.iconText}>الفئات</Text>
                </View>
                <View>
                    <Ionicons name="arrow-back-outline" size={24} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="layers-outline" size={24} />
                    <Text style={styles.iconText}>الفئات الفرعيه</Text>
                </View>
                <View>
                    <Ionicons name="arrow-back-outline" size={24} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="apps-outline" size={24} />
                    <Text style={styles.iconText}>الانواع</Text>
                </View>
                <View>
                    <Ionicons name="arrow-back-outline" size={24} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="car-outline" size={24} />
                    <Text style={styles.iconText}>الموديلات</Text>
                </View>
                <View>
                    <Ionicons name="arrow-back-outline" size={24} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="pricetag-outline" size={24} />
                    <Text style={styles.iconText}>العلامات التجاريه</Text>
                </View>
                <View>
                    <Ionicons name="arrow-back-outline" size={24} />
                </View>
            </TouchableOpacity>
    
        </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        paddingVertical: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        marginBottom: 24
    },
    iconTextContainer: {
        flexDirection: 'row-reverse'
    },
    iconText: {
        marginRight: 8,
        fontWeight: 'bold',
        color: COLORS.TEXT_BODY,
        fontSize: 16
    }
})

export default FormsNavigatorScreen
