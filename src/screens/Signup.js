import { useState } from "react"
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Alert } from "react-native"
import Layout from "../components/Layout"
import { Subtitle, Title } from "../components/Typography"
import InputField from "../components/InputField"
import Button from "../components/Button"
import Spacing from "../components/Spacing"
import { COLORS } from "../components/Colors"
import { auth, db } from "../services/firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore'


const SignupScreen = ({ navigation }) => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const [nameError, setNameError] = useState()
    const [emailError, setEmailError] = useState()
    const [phoneError, setPhoneError] = useState()
    const [passwordError, setPasswordError] = useState()

    const resetForm = () => {
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
    }
    
    const handleFirebaseError = (errorCode) => {
        let errorMessage = "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى."
    
        switch (errorCode) {
          case "auth/email-already-in-use":
            errorMessage = "البريد الإلكتروني مستخدم بالفعل."
            break
          case "auth/invalid-email":
            errorMessage = "البريد الإلكتروني غير صالح."
            break
          case "auth/weak-password":
            errorMessage = "كلمة المرور ضعيفة، اختر كلمة مرور أقوى."
            break
          case "auth/operation-not-allowed":
            errorMessage = "تم تعطيل تسجيل الحسابات الجديدة."
            break
          default:
            console.error("Firebase Error:", errorCode)
        }
    
        Alert.alert("خطأ في التسجيل", errorMessage)
      }

    const handleSubmit = async () => {
        if(!name) {
            return setNameError('الاسم مطلوب')
        }

        if(!email) {
            return setEmailError('البريد مطلوب')
        } else if(!/\S+@\S+\.\S+/.test(email)) {
            return setEmailError('البريد غير صالح')
        }

        if(!phone) {
            return setPhoneError('رقم الهاتف مطلوب')
        } else if(!/^\d{11}$/.test(phone)) {
            return setPhoneError('رقم الهاتف يجب أن يكون 11 رقماً')
        }

        if (!password) {
            return setPasswordError("كلمة المرور مطلوبة")
        } else if (password.length < 6) {
            return setPasswordError("كلمة المرور يجب أن تكون على الأقل 6 أحرف")
        }

        setIsLoading(true)
        
        try {

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user

            await setDoc(doc(db, 'users', user.uid), {
                name,
                email,
                phone,
                createdAt: new Date()
            })

            setIsLoading(false)
            resetForm()
            Alert.alert("تم التسجيل بنجاح!", "اهلا بك معنا.")
            navigation.navigate("Home")

        } catch(error) {
            setIsLoading(false)
            handleFirebaseError(error.code)

        }
    }

    return (
        <Layout>
            <Title>
                انشاء حساب
            </Title>
            <Spacing type={'large'} />
            <View>
                <InputField 
                label={'الاسم'}
                placeholder={'الاسم'}
                icon={'person-outline'}
                value={name}
                onChangeText={(value) => setName(value)}
                onPress={() => setNameError()}
                errorMessage={nameError}
                />
            </View>
            <View>
                <InputField 
                label={'البريد'}
                placeholder={'البريد'}
                keyboardType={'email-address'}
                icon={'mail-outline'}
                value={email}
                onChangeText={(value) => setEmail(value)}
                onPress={() => setEmailError()}
                errorMessage={emailError}
                autoCapitalize="none"
                autoCorrect={false}
                />
            </View>
            <View>
                <InputField 
                label={'الهاتف'}
                placeholder={'الهاتف'}
                keyboardType={'phone-pad'}
                icon={'call-outline'}
                value={phone}
                onChangeText={(value) => setPhone(value)}
                onPress={() => setPhoneError()}
                errorMessage={phoneError}
                />
            </View>
            <View>
                <InputField 
                label={'كلمة المرور'}
                placeholder={'كلمة المرور'}
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => setPassword(value)}
                onPress={() => setPasswordError()}
                errorMessage={passwordError}
                />
            </View>
            <Spacing type={'medium'} />
            <View>
                {
                    isLoading ?
                    <ActivityIndicator size={24} color={COLORS.PRIMARY} />
                    :
                    <Button 
                    title={'انشاء حساب'} 
                    onPress={handleSubmit}
                    />
                }
            </View>
            <Spacing type="large" />
            <View style={styles.footer}>
                <Text style={styles.footerText}>هل لديك حساب بالفعل؟</Text>
            </View>
            <Spacing type="medium" />
            <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerNavigationButton}>تسجيل الدخول</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        fontWeight: 'normal',
        color: '#000',
        fontSize: 14
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontWeight: 'bold',
        color: COLORS.TEXT_BODY
    },
    footerNavigationButton: {
        color: COLORS.PRIMARY
    }
})

export default SignupScreen