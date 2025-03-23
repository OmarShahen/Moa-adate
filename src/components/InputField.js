import { useState } from "react"
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'

const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    onPress,
    secureTextEntry=false,
    keyboardType='default',
    icon,
    style,
    errorMessage,
    multiline=false,
    autoCapitalize,
    autoCorrect,
    editable
}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry)

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {icon && <Ionicons name={icon} size={20} color={'#666'} style={styles.icon} />}
                <TextInput 
                onPress={onPress}
                style={[styles.input, icon && { paddingRight: 40 }, style]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor='#888'
                multiline={multiline}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                editable={editable}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color='#666' />
                    </TouchableOpacity>
                )}
            </View>
            { errorMessage &&  <Text style={styles.errorMessage}>{errorMessage}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
        textAlign: 'right'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        backgroundColor: '#FFF',
        //paddingHorizontal: 12,

    },
    input: {
      flex: 1,
      paddingVertical: 16,
      paddingRight: 16,
      fontSize: 16,
      color: '#000',
      textAlign: 'right'
    },
    errorMessage: {
        color: 'red',
        textAlign: 'right',
        fontWeight: 'bold'
    },
    icon: {
        position: 'absolute',
        left: 12
    },
    eyeIcon: {
        position: 'absolute',
        left: 12
    }
})

export default InputField