import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
//import Resizer from "react-image-file-resizer";
//import Compressor from "compressorjs";

import {
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription
} from "@chakra-ui/react";

import { uploadFromBlobAsync } from "../storage";
import AppFunctions from "../services/AppFunctions";

export default function Dropzone({ item,mobile, reloadShoppingList,onClose }) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  //const [compressedFile, setCompressedFile] = useState(null);

  //console.log(item)

  /* function compressImage(image) {
    const img = new Compressor(image, { quality: 0.8 });
    return img;
  } */

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];

    if (!file) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const newUrl = await uploadFromBlobAsync({
        blobUrl: URL.createObjectURL(file),
        name: `${file.name}_${Date.now()}`,
      });
      replacePicture(newUrl);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      return;
    }
    setIsLoading(false);
    setMessage("File was uploaded ");
  }, []);

  function replacePicture(updatedUrl) {
    const product = AppFunctions.getItemById(item.id);
    product.url = updatedUrl;
    const otherProducts = AppFunctions.getRestOfTheListById(item.id);
    AppFunctions.saveListToLocalSorage([...otherProducts, product]);
    reloadShoppingList()
    onClose()
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {!mobile ? (
        <Flex
          bg="white"
          w="100%"
          h={150}
          justify="center"
          align="center"
          p={50}
          m={2}
          borderRadius={10}
          borderColor="#dadada"
          borderWidth="2px"
          borderStyle="dashed"
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "#fafafa", borderColor: "grey" }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <Spinner />
          ) : isDragActive ? (
            <Text>Drop the file here...</Text>
          ) : (
            <Text>
             
                To update the picture <br />
                <strong>Drag and drop your image here</strong> <br />
                or <br />
                <strong> click</strong> to select a file
              
            </Text>
          )}
        </Flex>
        ) : (
<Flex
          h="2rem"
          fontSize="inherit"
          fontWeight="800"
       
          justify="center"
          align="center"
          padding="1.5em"

          bg="var(--ikeaBlue)"
          color="white"
          borderRadius="50em"
         
        
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "var(--ikeaBlueHover)"}}

          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isLoading ? ( <Spinner /> ) : (
            <Text>
              <dispatchEvent>
               Update picture
              </dispatchEvent>
            </Text>
          )}
        </Flex>


          )}
     

      {(error || message) && (
        <Alert
          status={error ? "error" : "success"}
          w={250}
          borderRadius={5}
          m={2}
        >
          <AlertIcon />
          <AlertDescription w={200}>{error || message}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
