import React from "react";
import Dropzone from "./Dropzone";
import { ZoomIn } from 'react-bootstrap-icons';

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
      <ZoomIn className="btn btn-sm" />
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

        <ModalContent borderRadius="0px">
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
