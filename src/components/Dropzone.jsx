//External imports
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import {
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

//Local imports
//64 as the name does not explain what it is.
// it could be 64bits for CPU power, encription.
// in this case is the base 64 encoding, thus it need a better name
import { uploadTask64 } from "../storage";
import AppFunctions from "../services/AppFunctions"; // monolithic function, you should only import the methods for upload an image

// React should not know if we are on a mobile device
// if you have 2 separate components in case you want different functionality for mobile
// it should be global instead of passed as props.
export default function Dropzone({
  item,
  mobile,
  reloadShoppingList,
  onClose,
}) {
  //States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  //Functions
  const resizeFile = (file) => {
    new Promise((resolve) => {
      // you are passing too many numbers withouth description
      // try to think a way to make it a bit cleaner.
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "PNG",
        100,
        0,
        (uri) => resolve(uri),
        "base64"
      );
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    const fileName = file.name;
    const image64 = await resizeFile(file); // according to VS Code await is not needed here.

    if (!file) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const newUrl = await uploadTask64(image64, fileName);
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
    reloadShoppingList();
    onClose();
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // The flex class has horrible organization. I know it comes from an external CSS library, but if you import something you take the consequences.
  // you are just writting CSS inside JSX, making the component incredible difficult to reason about -1
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
          _hover={{ bg: "var(--ikeaBlueHover)" }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <Spinner />
          ) : (
            <Text>
              <dispatchEvent>Update picture</dispatchEvent>
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
