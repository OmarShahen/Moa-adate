import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Alert } from "react-native"
import Layout from "../components/Layout"
import { Subtitle, Title } from "../components/Typography"
import InputField from "../components/InputField"
import Button from "../components/Button"
import Spacing from "../components/Spacing"
import { COLORS } from "../components/Colors"
import { useState } from "react"
import { auth } from "../services/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleSubmit = async () => {

        if(!email) {
            return setEmailError('البريد مطلوب')
        }

        if(!password) {
            return setPasswordError('كلمة المرور مطلوبة')
        }

        try {

            setIsLoading(true)
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            resetForm()
            setIsLoading(false)
            navigation.navigate('Home')

        } catch(error) {
            setIsLoading(false)
            if(error.code === 'auth/user-not-found') {
                setEmailError('البريد غير مسجل')
            } else if(error.code === 'auth/wrong-password') {
                setPasswordError('كلمة المرور غير صحيحة')
            } else if(error.code === 'auth/invalid-credential') {
                setEmailError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
            } else if(error.code === 'auth/invalid-email') {
                setEmailError('البريد غير صالح')
            } else {
                Alert.alert("خطأ", "حدث خطأ. يرجى المحاولة مرة أخرى."); // General error in alert
            }
        }
        
        
    }

    return (
        <Layout>
            <Title>
                تسجيل الدخول
            </Title>
            <Spacing type={'large'} />
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
                    title={'تسجيل الدخول'} 
                    onPress={handleSubmit}
                    />
                }
            </View>
            <Spacing type="large" />
            <View style={styles.footer}>
                <Text style={styles.footerText}>ليس لديك حساب؟</Text>
            </View>
            <Spacing type="medium" />
            <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.footerNavigationButton}>تسجيل جديد</Text>
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

export default LoginScreen