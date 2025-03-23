import { useContext } from "react"
import { Share, TouchableOpacity, View, StyleSheet } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "../screens/Home"
import LoginScreen from "../screens/Login"
import SignupScreen from "../screens/Signup"
import { Ionicons } from "@expo/vector-icons"
import EquipmentsScreen from "../screens/Equipments"
import EquipmentScreen from "../screens/Equipment"
import EquipmentFormScreen from "../screens/Equipment-Form"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ProfileDetailsScreen from "../screens/Profile"
import { AuthContext } from "../context/AuthContext"
import FormsNavigatorScreen from "../screens/admin/Forms-Navigator"
import CategoriesFormScreen from "../screens/admin/Categories-Form"
import SubcategoriesFormScreen from "../screens/admin/Subcategories-Form"
import TypesFormScreen from "../screens/admin/Types-Form"
import BrandsFormScreen from "../screens/admin/Brand-Form"
import ModelFormScreen from "../screens/admin/Model-Form"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const shareApp = async () => {
    try {
        await Share.share({
            message: "🚜 هل تبحث عن معدات ثقيلة؟ يمكنك العثور على ما تحتاجه هنا:\n\n" +
                     "🔗 https://play.google.com/store/apps/details?id=com.Webperon.HeavyMachinesConstructionSimulator",
          })
    } catch(error) {
        console.error(error)
    }
}

const HomeStack = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                title: 'الرئيسية',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                    onPress={shareApp}
                    style={{ marginLeft: 16 }}
                    >
                        <Ionicons name="share-social" size={24} color={"black"} />
                    </TouchableOpacity>
                )
            }} 
            />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Equipments" component={EquipmentsScreen} options={{ title: 'المعدات' }} />
            <Stack.Screen name="Equipment" component={EquipmentScreen} options={{ title: 'المعدة' }} />
        </Stack.Navigator>
    )
}

const EquipmentFormStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Equipment-Form" component={EquipmentFormScreen} options={{ title: 'إضافة المعدة' }} />
        </Stack.Navigator>
    )
}

const AuthFormStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'إنشاء حساب' }} />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileDetailsScreen} options={{ title: 'حسابي' }} />
        </Stack.Navigator>
    )
}

const FormNavigatorStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Form-Navigator" component={FormsNavigatorScreen} options={{ title: 'الادارة' }} />
            <Stack.Screen name="Categories-Form" component={CategoriesFormScreen} options={{ title: 'اضافة فئة' }} />
            <Stack.Screen name="Subcategories-Form" component={SubcategoriesFormScreen} options={{ title: 'اضافة فئة فرعية' }} />
            <Stack.Screen name="Types-Form" component={TypesFormScreen} options={{ title: 'اضافة نوع' }} />
            <Stack.Screen name="Brand-Form" component={BrandsFormScreen} options={{ title: 'اضافة علامة تجارية' }} />
            <Stack.Screen name="Model-Form" component={ModelFormScreen} options={{ title: 'اضافة موديل' }} />
        </Stack.Navigator>
    )
}

const BottomTabs = () => {

    const { user } = useContext(AuthContext)

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
            name="Home"
            component={HomeStack}
            options={{
                title: 'الرئيسية',
                tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            }}
            />
            {
                user.isLogged ?
                <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    title: 'الحساب',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                }}
                />
                :
                <Tab.Screen
                name="Login"
                component={AuthFormStack}
                options={{
                    title: 'الحساب',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                }}
                />
            }
            
            <Tab.Screen
            name="Equipment-Form"
            component={EquipmentFormStack}
            options={{
                title: 'إضافة',
                tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
            }}
            />
            <Tab.Screen 
            name="Forms-Navigator"
            component={FormNavigatorStack}
            options={{
                title: 'الادارة',
                tabBarIcon: ({ color, size }) => <Ionicons name="clipboard-outline" size={size} color={color} />
            }}
            />
        </Tab.Navigator>
    )
}

export const AppNavigator = () => {

    return (
        <NavigationContainer>
            <BottomTabs />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingHorizontal: 16, // Adjust the horizontal spacing
      paddingVertical: 10,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "#ddd",
    },
  })