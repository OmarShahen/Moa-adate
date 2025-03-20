import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { COLORS } from './Colors'

const Button = ({ title, onPress, loading = false, style, disabled = false }) => {

    return (
        <TouchableOpacity
        style={[styles.button, disabled && styles.disabled, style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        >
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.text}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    disabled: {
        backgroundColor: '#CCC'
    }
})

export default Button