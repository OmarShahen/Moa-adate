import AuthProvider from './src/context/AuthContext'
import { AppNavigator } from './src/navigation/navigator'


export default function App() {

  /*useEffect(() => {
    I18nManager.allowRTL(true)
    I18nManager.forceRTL(true)
  }, [])*/

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}

