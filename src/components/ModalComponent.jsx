import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Overlay from "react-overlay-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "./Dropzone";
import AppFunctions from "../services/AppFunctions";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function ModalComponent({
  item,
  label,
  reloadShoppingList,
  button,
  add,
  zoom,
  edit,
}) {
  //constants

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonLabel, setButtonLabel] = useState("button");

  const [text, setText] = useState("");
  const [price, setPrice] = useState(-1);

  class Product {
    constructor(id, name, price, url, acquired, timestamp) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.url = url;
      this.acquired = acquired;
      this.timestamp = timestamp;
    }
  }

  //FUNCTIONS
  const addItemToList = (e) => {
    e.preventDefault();
    // check that data entered is correct
    const isANumber = !isNaN(text);
    const emptyPrice = price === -1;

    if (
      typeof text == !"string" ||
      text.length < 3 ||
      text.length > 21 ||
      isANumber
    ) {
      alert("Please enter a valid name (3 - 20 characters) ");
    } else if (isNaN(price) || emptyPrice || price > 100000) {
      alert("Please enter a valid price (max 100 000)");
    } else {
      const savedList = AppFunctions.getSavedListInLocalStorage();

      const defaultImgUrl =
        "https://clecardona.com/summer_camp/eika/gummy-chair.svg";
      let newItem = new Product(
        uuidv4(),
        text.toUpperCase(),
        price,
        defaultImgUrl,
        false,
        Date.now()
      );

      savedList.push(newItem);
      AppFunctions.saveListToLocalSorage(savedList);

      e.target.reset();
      onClose();
      reloadShoppingList();
    }
  };

  return (
    <>
      {button ? (
        <div>
          {add && (
            <Button
              bg="#3C5B9C"
              color="white"
              leftIcon="+"
              _hover={{ bg: "#14357E" }}
              onClick={onOpen}
            >
              {label}
            </Button>
          )}
          {edit && (
            <Button
              bg="#3C5B9C"
              color="white"
              leftIcon={
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
              }
              _hover={{ bg: "#14357E" }}
              onClick={onOpen}
            >
              {label}
            </Button>
          )}

          {zoom && (
            <button className="btn img-overlay" onClick={onOpen}>
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
          )}
        </div>
      ) : (
        <div></div>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <div className="modal">
            <form onSubmit={addItemToList}>
              {(add||edit) && <ModalHeader>{label}</ModalHeader>}
              <ModalCloseButton />

              {(add||edit) && (
                <ModalBody>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setText(e.target.value)}
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                    placeholder="Enter a new item..."
                  ></input>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                    placeholder="Price"
                  ></input>
                </ModalBody>
              )}

              {zoom && (
                <ModalBody>
                  <div className="overlay">
                    <img className="img-zoom" src={item.url} alt="imgproduct" />
                  </div>
                </ModalBody>
              )}

              <ModalFooter>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                >
                  Close
                </Button>
                {add && (
                  <Button
                    type="submit"
                    bg="#3C5B9C"
                    color="white"
                    leftIcon={"+"}
                    _hover={{ bg: "#14357E" }}
                  >
                    {label}
                  </Button>
                )}
              </ModalFooter>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
