import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
  Text,
  Select,
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

  class Product {
    constructor(id, name, price, quantity, url, acquired, timestamp) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
      this.url = url;
      this.acquired = acquired;
      this.timestamp = timestamp;
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [text, setText] = useState("");
  const [price, setPrice] = useState(-1);
  const [quantity, setQuantity] = useState(1);

  const itemExists = AppFunctions.getSavedListInLocalStorage().some(
    (item) => item.name === text.toUpperCase()
  );

  //FUNCTIONS
  function closeModal() {
    setText("");
    onClose();
  }

  const addItemToList = (e) => {
    e.preventDefault();

    if (AppFunctions.isDataCorrect(text, price)) {
      const savedList = AppFunctions.getSavedListInLocalStorage();

      //add the item
      const defaultImgUrl =
        "https://clecardona.com/summer_camp/eika/mobel.jpeg";

      const newItem = new Product(
        uuidv4(),
        text.toUpperCase(),
        price,
        quantity,
        defaultImgUrl,
        false,
        Date.now()
      );
      const newList = [...savedList, newItem];
      AppFunctions.saveListToLocalSorage(newList);

      e.target.reset();
      closeModal();
      reloadShoppingList();
    }
  };

 
  const editItem = (e) => {
    e.preventDefault();

    const savedList = AppFunctions.getSavedListInLocalStorage();
    const itemToEdit = savedList.filter(function (i) {
      return i.id === item.id;
    })[0];


    if (text.length === 0) {
      itemToEdit.name = item.name;
    } else {
      if (!AppFunctions.isNameCorrect(text)) {
        alert("Please enter a valid name (3 - 15 characters) ");
        return
      } else {
        itemToEdit.name = text.toUpperCase();
      }
    }

    if (price === -1) {
      itemToEdit.price = item.price;
    } else {
      if (AppFunctions.isPriceCorrect(price)) {
        itemToEdit.price = price;
      } else {
        alert("Please enter a valid price (max 100 000)");
        return
      }
    }

    if (quantity) {
      itemToEdit.quantity = quantity;
    } else {
      itemToEdit.quantity = item.quantity;
    }

    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });

    const newList = [...otherProducts, itemToEdit];
    AppFunctions.saveListToLocalSorage(newList);

    e.target.reset();
    closeModal();
    reloadShoppingList();
  };

  return (
    <>
      {add && (
        <Button /******* Button to open the Modal *******/
          
          h="37px"
          fontSize="inherit"
          bg="var(--ikeaBlue)"
          color="white"
          leftIcon="+"
          borderRadius="50em"
          _hover={{ bg: "var(--ikeaBlueHover)" }}
          onClick={onOpen}
        >
          {label}
        </Button>
      )}

      {edit && (
        <button className="btn btn-linear " onClick={onOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-gear"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
        </button>
      )}

      <Modal /******* The Modal  *******/
        size="xs"
        blockScrollOnMount={false}
        motionPreset="slideInBottom"
        trapFocus={false}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <ModalOverlay />

        <ModalContent>
          <div className="modal">
            <form onSubmit={add ? addItemToList : editItem}>
              <ModalHeader>{label}</ModalHeader>
              <ModalCloseButton borderRadius="50em" />

              <ModalBody>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setText(e.target.value)}
                  onFocus={(e) => {
                    e.target.value = "";
                  }}
                  placeholder={add ? "Enter a new item..." : item.name}
                ></input>

                <>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                    placeholder={add ? "Price" : item.price}
                  ></input>

                  <Select
                    w="100%"
                    marginTop="3px"
                    fontSize="inherit"
                    borderRadius="50px"
                    placeholder={add ? "Quantity" : item.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                  </Select>
                </>

                {itemExists && (
                  <Text
                    w="100%"
                    marginTop="5px"
                    textAlign="center"
                    fontSize="var(--fs)"
                    color="tomato"
                  >
                    Item already exists.
                  </Text>
                )}
              </ModalBody>

              <ModalFooter bg="none">
                <Button
                  h="2rem"
                  w="90px"
                  fontSize="var(--fs)"
                  bg="var(--ikeaGreyHover)"
                  color="var(--ikeaGreyTextAndIcon)"
                  borderRadius="50em"
                  marginRight="12px"
                  onClick={closeModal}
                  _hover={{ border: "1px solid var(--ikeaGreyTextAndIcon)" }}
                >
                  Close
                </Button>

                <Button
                  type="submit"
                  disabled={itemExists}
                  h="2rem"
                  fontSize="var(--fs)"
                  bg="var(--ikeaBlue)"
                  color="white"
                  leftIcon={
                    add ? (
                      "+"
                    ) : (
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
                    )
                  }
                  borderRadius="50em"
                  _hover={{ bg: "var(--ikeaBlueHover)" }}
                >
                  {label}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
