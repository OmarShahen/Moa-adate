import React, { useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity, Modal, StyleSheet, ScrollView, Linking } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BodyText, Title } from "../components/Typography"
import Layout from "../components/Layout"
import Spacing from "../components/Spacing"

const EquipmentScreen = ({ route }) => {
  const { equipment } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const openImage = (image) => {
    setSelectedImage(image)
    setModalVisible(true)
  }

  const callOwner = () => {
    Linking.openURL(`tel:${equipment.ownerPhone}`)
  }

  return (
    <Layout>
    <ScrollView 
    style={styles.container}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >
      {/* Image Slider */}
      <FlatList
        data={equipment.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImage(item)}>
            <Image source={{ uri: item }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      />

      {/* Full-Screen Image Modal */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
        </View>
      </Modal>

      <Spacing type="medium" />
      {/* Equipment Details */}
      <View style={styles.detailsContainer}>
        <Title>{equipment.name}</Title>
        <Text style={styles.price}>{equipment.price} EGP</Text>
      </View>

      {/* Call Owner Button */}
      <TouchableOpacity style={styles.callButton} onPress={callOwner}>
        <Ionicons name="call" size={24} color="#fff" style={styles.callIcon} />
        <Text style={styles.callText}>اتصل بالمعلن</Text>
      </TouchableOpacity>
      <Spacing type="medium" />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text>المدينة</Text>
          <Text style={styles.infoContainerValue}>الاسكندرية</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>الوقود</Text>
          <Text style={styles.infoContainerValue}>بنزين</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>الموديل</Text>
          <Text style={styles.infoContainerValue}>GLC 200</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>السعر</Text>
          <Text style={styles.infoContainerValue}>4,600 جنيه</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>تاريخ النشر</Text>
          <Text style={styles.infoContainerValue}>2025-03-18</Text>
        </View>
      </View>
      <Spacing type="medium" />
      <View style={styles.descriptionContainer}>
        <BodyText>
        آلة قوية تستخدم في تمهيد الأرض، إزالة الأنقاض، وتسوية التربة في المشاريع الإنشائية.
        آلة قوية تستخدم في تمهيد الأرض، إزالة الأنقاض، وتسوية التربة في المشاريع الإنشائية.
        آلة قوية تستخدم في تمهيد الأرض، إزالة الأنقاض، وتسوية التربة في المشاريع الإنشائية.
        </BodyText>
      </View>
    </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    width: 120,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC'
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
  },
  price: {
    fontSize: 20,
    color: "#27ae60",
    fontWeight: 'bold',
    textAlign: "right",
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "right",
  },
  callButton: {
    flexDirection: "row",
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  callIcon: {
    marginRight: 10,
  },
  callText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 15
  },
  infoRow: {
    flexDirection: 'row-reverse',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  infoContainerValue: {
    fontWeight: 'bold'
  },
  descriptionContainer: {
    backgroundColor: '#FFF',
    direction: 'rtl',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 15
  }
})

export default EquipmentScreen
