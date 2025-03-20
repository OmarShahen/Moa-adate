import { useState, useLayoutEffect } from "react"
import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native"
import EquipmentCard from "../components/cards/Equipment"
import Layout from "../components/Layout"
import { Title } from "../components/Typography"
import Spacing from "../components/Spacing"
import { Ionicons } from "@expo/vector-icons"
import FilterSearchModal from "../components/modals/Filter"


const equipmentData = [
  {
    id: "1",
    name: "حفار كوماتسو",
    price: 5000,
    location: "القاهرة",
    imageUrl: "https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain",
  },
  {
    id: "2",
    name: "رافعة برجية",
    price: 7000,
    location: "الإسكندرية",
    imageUrl: "https://5.imimg.com/data5/ZZ/IL/AL/SELLER-8211884/crane-1000x1000.JPG",
  },
  {
    id: "18",
    name: "بلدوزر كاتربيلر",
    price: 4500,
    ownerPhone: '+201098765432',
    location: "الجيزة",
    imageUrl: "https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain",
    images: [
        'https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain',
        'https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain',
        'https://i1.wp.com/www.giznet.id/wp-content/uploads/2023/07/Bagian-Utama-Bulldozer-dan-Fungsinya.png',
        'https://i1.wp.com/www.giznet.id/wp-content/uploads/2023/07/Bagian-Utama-Bulldozer-dan-Fungsinya.png'
    ]
  },
  {
    id: "4",
    name: "بلدوزر كاتربيلر",
    price: 4500,
    location: "الجيزة",
    imageUrl: "https://bluebridgefinancial.com/wp-content/uploads/2024/04/DALL%C2%B7E-2024-04-10-12.55.21-A-realistic-and-simple-photo-of-a-yellow-excavator-captured-in-a-wide-horizontal-format.-The-excavator-is-positioned-on-a-dirt-surface-with-its-boom-1.webp",
  },
  {
    id: "5",
    name: "بلدوزر كاتربيلر",
    price: 4500,
    location: "الجيزة",
    imageUrl: "https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain",
  },
  {
    id: "6",
    name: "بلدوزر كاتربيلر",
    price: 4500,
    ownerPhone: '+201098765432',
    location: "الجيزة",
    imageUrl: "https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain",
    images: [
        'https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain',
        'https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain',
        'https://i1.wp.com/www.giznet.id/wp-content/uploads/2023/07/Bagian-Utama-Bulldozer-dan-Fungsinya.png',
        'https://i1.wp.com/www.giznet.id/wp-content/uploads/2023/07/Bagian-Utama-Bulldozer-dan-Fungsinya.png'
    ]
  },
  {
    id: "7",
    name: "بلدوزر كاتربيلر",
    price: 4500,
    location: "الجيزة",
    imageUrl: "https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain",
  },
  {
    id: "8",
    name: "بلدوزر كاتربيلر",
    price: 4500,
    location: "الجيزة",
    imageUrl: "https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain",
  },
]

const EquipmentsScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [filters, setFilters] = useState({ searchQuery: "", selectedCategory: null })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 16 }}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setModalVisible(false)
  }

  return (
    <Layout>
      <FilterSearchModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onApply={handleApplyFilters} 
      />
        <Title>الحفارات</Title>
        <Spacing type={'medium'} />
        <FlatList
            data={equipmentData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EquipmentCard equipment={item} onPress={() => {
                navigation.navigate('Equipment', { equipment: item })
            }} />}
        />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F8F9FA",
  },
})

export default EquipmentsScreen
