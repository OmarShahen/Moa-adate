import { Text, StyleSheet } from 'react-native'
import { COLORS } from './Colors'


export const Title = ({ children, style }) => {
    return <Text style={[styles.title, style]}>{children}</Text>
}

export const Subtitle = ({ children, style }) => {
    return <Text style={[styles.subtitle, style]}>{children}</Text>
}

export const BodyText = ({ children, style }) => {
    return <Text style={[styles.body, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    title: { fontSize: 24, fontWeight: 'bold', color: COLORS.TEXT_TITLE, textAlign: 'right' },
    subtitle: { fontSize: 18, fontWeight: '600', color: COLORS.TEXT_SUBTITLE, textAlign: 'right' },
    body: { fontSize: 14, color: COLORS.TEXT_BODY, textAlign: 'right' }
})