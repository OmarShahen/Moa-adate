import { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Layout from "../components/Layout"
import { Title } from "../components/Typography"
import InputField from "../components/InputField"
import Spacing from "../components/Spacing"
import Button from "../components/Button"


const ProfileDetailsScreen = ({ navigation }) => {
  const userData = { name: 'Omar', email: 'omar@gmail.com', phone: '01065630331' } // Get userData data from context

  // Editable state for userData details
  const [name, setName] = useState(userData?.name || "")
  const [email, setEmail] = useState(userData?.email || "")
  const [phone, setPhone] = useState(userData?.phone || "")
  
  const handleUpdateProfile = () => {
    // Here you would call your API to update the profile
    alert("تم تحديث الملف الشخصي بنجاح! ✅")
  }

  return (
    <Layout>
        <Title style={styles.header}>الملف الشخصي</Title>
        <Spacing type={'medium'} />

        <InputField
        label={'الاسم'}
        value={name}
        onChangeText={setName}
        placeholder="الاسم"
        icon={'person-outline'}
        />

        <InputField
        label={"البريد الإلكتروني"}
        value={email}
        onChangeText={setEmail}
        placeholder="البريد الإلكتروني"
        keyboardType="email-address"
        icon={'mail-outline'}
        />

        <InputField
          label={"رقم الهاتف"}
          value={phone}
          onChangeText={setPhone}
          placeholder="رقم الهاتف"
          keyboardType="phone-pad"
          icon={"call-outline"}
        />

      <Spacing type={'medium'} />
      <Button title={'تحديث الملف الشخصي'} />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
})

export default ProfileDetailsScreen
