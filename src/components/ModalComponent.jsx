import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Dropzone from "./Dropzone";
import AppFunctions from "../services/AppFunctions";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";

export default function ModalComponent({ item, label }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan414] = useMediaQuery("(min-width: 414px)");

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

      {/* <button className="btn btn-linear btn-pencil" onClick={onOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </button> */}

      <Modal
        size="xl"
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

            {isLargerThan414 && <Dropzone item={item} mobile={false}/>}

          </Flex>

          {!isLargerThan414 && (
            <ModalFooter bg="transparent">
              <Dropzone item={item} mobile={true}/>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
