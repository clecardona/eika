import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react'

import { uploadFromBlobAsync } from '../storage'
import Methods from "../services/Methods";

export default function Dropzone({item}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

//console.log(item)


function replacePicture(updatedUrl) {
  const savedList = Methods.getSavedListInLocalStorage();
  
  const product = savedList.filter(function (i) {
    return i.id === item.id;
  });
  product[0].url = updatedUrl;

  const otherProducts = savedList.filter(function (i) {
    return i.id !== item.id;
  });
  otherProducts.push(product[0]);
  Methods.saveListToLocalSorage(otherProducts)
  
  window.location.reload();
}



  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0]

    if (!file) {
      return
    }

    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      
      const newUrl = await uploadFromBlobAsync({
        blobUrl: URL.createObjectURL(file),
        name: `${file.name}_${Date.now()}`,
      }) 
      replacePicture(newUrl)
      
    } catch (e) {
      setIsLoading(false)
      setError(e.message)
      return
    }
    setIsLoading(false)
    setMessage('File was uploaded 👍')
  },[])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <Flex
        bg="#dadada"
        w={250}
        h={200}
        justify="center"
        align="center"
        p={50}
        m={2}
        borderRadius={5}
        textAlign="center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <Spinner />
        ) : isDragActive ? (
          <Text>Drop the files here...</Text>
        ) : (
          <Text><p><strong>Drag and drop </strong><br/>your image here <br/><br/> or <strong>click</strong> to select files</p></Text>
        )}
      </Flex>
      {(error || message) && (
        <Alert
          status={error ? 'error' : 'success'}
          w={250}
          borderRadius={5}
          m={2}
        >
          <AlertIcon />
          <AlertDescription w={200}>{error || message}</AlertDescription>
        </Alert>
      )}
    </>
  )
}