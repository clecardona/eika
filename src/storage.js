import firebase from './firebase'
import Resizer from "react-image-file-resizer";


/* class Storage{
}
export default new Storage(); */


/* const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, 30, 30, "JPG", 100, 0, (uri) => {
      resolve(uri);
    });
  });

async function uri(file) {
  await resizeFile(file);
  console.log(uri);
}   */








export const uploadFromBlobAsync = async ({ blobUrl, name }) => {
  if (!blobUrl || !name) return null

  try {
    const blob = await fetch(blobUrl).then((r) => r.blob())

    //onst lightBlob = Resizer.imageFileResizer(blob, 30, 30, "JPG", 100, 0)

    //const fileName = `thumb_${file.name}.png`; //filename of thumbnail
    //const thumbRef = ref(storage, `images/${fileName}`);
    //const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");
    //const thumbUrl = await getDownloadURL(thumbSnapshot.ref);

    const snapshot = await firebase.storage().ref().child(name).put(blob)
    return await snapshot.ref.getDownloadURL()
  } catch (error) {
    throw error
  }
}
