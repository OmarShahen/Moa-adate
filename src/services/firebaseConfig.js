import { initializeApp } from "firebase/app"
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"


// Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDdbinzoSn0TunhP_f9S3V81AifzXRwHjE",
  authDomain: "moa-adate.firebaseapp.com",
  projectId: "moa-adate",
  storageBucket: "moa-adate.firebasestorage.app",
  messagingSenderId: "943341420226",
  appId: "1:943341420226:web:7423aad7c37a5e299d055b",
  measurementId: "G-3GVE0FXPM4"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })

const db = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)

export { auth, db, storage, analytics }
