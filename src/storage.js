// Put state files in a /state folder (old comment)
// This file needs to be rename to something more specific, because i though it was a state file (Vue and Redux use the name store)
// so this should be called imageStore or similar. After all you are hardcoding contentType: "image/png" making it only work for images anyways.

import firebase from "./firebase";
import "firebase/storage";

export async function uploadTask64(image64, fileName) {
  try {
    const snapshot = await firebase
      .storage()
      .ref(`${fileName}_${Date.now()}`)
      .putString(image64, "data_url", { contentType: "image/png" });
    return snapshot.ref.getDownloadURL();
  } catch (error) {
    throw error;
  }
}
