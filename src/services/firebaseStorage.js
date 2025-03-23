import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { fetch } from "@react-native-community/fetch-blob"
import { storage } from "./firebaseConfig"


export const uploadImageToFirebase = async (imageUri) => {
  try {

    // Convert local file to Blob
    const response = await fetch(imageUri)
    const blob = await response.blob()

    // Generate a unique filename
    const fileName = `equipments/${Date.now()}.jpg`
    const storageRef = ref(storage, fileName)

    // Upload the Blob
    await uploadBytes(storageRef, blob)

    // Get the file URL
    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL
    
  } catch (error) {
    console.error("Upload error:", error)
    return null
  }
}
