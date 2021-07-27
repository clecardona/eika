import firebase from "./firebase";
import 'firebase/storage'; 


export async function uploadTask64(image64,fileName){
    try {
    const snapshot = await firebase.storage().ref(`${fileName}_${Date.now()}`).putString(image64, 'data_url', { contentType: 'image/png' });
    return  snapshot.ref.getDownloadURL();
  } catch (error) {
    throw error;
  }
} 

