import { initializeApp } from "firebase/app"
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore"

// Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDHWj0XbxVw3H1rsV35oylRimgrd6zLRmg",
  authDomain: "moa-daty.firebaseapp.com",
  projectId: "moa-daty",
  storageBucket: "moa-daty.firebasestorage.app",
  messagingSenderId: "568745523073",
  appId: "1:568745523073:android:4d6ad935f19f3ddb939a80"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })

const db = getFirestore(app)

export { auth, db }
