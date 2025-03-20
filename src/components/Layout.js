import { StyleSheet, SafeAreaView } from 'react-native'
import { COLORS } from './Colors'


const Layout = ({ children }) => {

    return <SafeAreaView style={styles.container}>
        {children}
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.BACKGROUND
    }
})

export default Layout