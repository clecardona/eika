import React from "react";
import Dropzone from "./Dropzone";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";

export default function ModalPicture({ item, label,reloadShoppingList }) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(min-width: 415px)");

  return (
    <>
      <button className="img-overlay" onClick={onOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-zoom-in"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
          />
          <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
          <path
            fill-rule="evenodd"
            d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
          />
        </svg>
      </button>

   

      <Modal
        size={isMobile ? "lg" : "xs"}
       
        blockScrollOnMount={false}
        motionPreset="slideInBottom"
        trapFocus={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{label}</ModalHeader>

          <ModalCloseButton borderRadius="50em" />
          <Flex
            direction="column"
            justify="center"
            align="center"
            h="fit-content"
            maxHeight={400}
            padding=" 5px"
            overflow="hidden"
          >
            <img className="img-zoom" src={item.url} alt="imgproduct" />

            {isMobile && <Dropzone item={item} mobile={false} reloadShoppingList={reloadShoppingList} onClose={onClose}/>}

          </Flex>

          {!isMobile && (
            <ModalFooter bg="transparent"
            display="flex"
            justifyContent="center">
              <Dropzone item={item} mobile={true}reloadShoppingList={reloadShoppingList} onClose={onClose}/>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
