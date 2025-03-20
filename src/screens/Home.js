import { useEffect, useState } from "react"
import { View } from "react-native"
import Layout from "../components/Layout"
import { Title } from "../components/Typography"
import Button from "../components/Button"
import Spacing from "../components/Spacing"
import { FlatList } from "react-native-gesture-handler"
import CategoryCard from "../components/cards/Category"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../services/firebaseConfig"
import { ActivityIndicator } from "react-native-paper"
import { COLORS } from "../components/Colors"


const HomeScreen = ({ navigation }) => {


    const categoriesData = [
        { id: "1", title: "حفار", imageUrl: "https://bluebridgefinancial.com/wp-content/uploads/2024/04/DALL%C2%B7E-2024-04-10-12.55.21-A-realistic-and-simple-photo-of-a-yellow-excavator-captured-in-a-wide-horizontal-format.-The-excavator-is-positioned-on-a-dirt-surface-with-its-boom-1.webp" },
        { id: "2", title: "رافعة", imageUrl: "https://5.imimg.com/data5/ZZ/IL/AL/SELLER-8211884/crane-1000x1000.JPG" },
        { id: "3", title: "بلدوزر", imageUrl: "https://i1.wp.com/www.giznet.id/wp-content/uploads/2023/07/Bagian-Utama-Bulldozer-dan-Fungsinya.png" },
        { id: "4", title: "شاحنة", imageUrl: "https://th.bing.com/th/id/OIP.ZJIJqBoPDAOrWw7NYdHsPwHaDt?rs=1&pid=ImgDetMain" },
      ]


    const [categories, setCategories] = useState([])  
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchCategories = async () => {
            try {

                const querySnapshot = await getDocs(collection(db, 'categories'))
                const categoryList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCategories(categoryList)
                setIsLoading(false)

            } catch(error) {
                setIsLoading(false)
                console.error(error)
            }
        }

        fetchCategories()
    }, [])

    return (
        <Layout>
            {
                isLoading ?
                <View>
                    <Spacing type={'large'} />
                    <ActivityIndicator size={'large'} color={COLORS.PRIMARY} />
                </View>
                :
                <View>
                    <Title>الفئات</Title>
                    <Spacing type={'medium'} />
                    {/*<Button title={'Go to login page'} onPress={() => navigation.navigate('Login')} />
                        <Spacing type={'medium'} />
                    <Button title={'Go to signup page'} onPress={() => navigation.navigate('Signup')} /> */}
                    <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Display in a 2-column grid
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => (
                    <CategoryCard
                        title={item.name}
                        imageUrl={item.imageURL}
                        onPress={() => navigation.navigate('Equipments')}
                    />
                    )}
                />
            </View>
            }
            
        </Layout>
    )
}

export default HomeScreen