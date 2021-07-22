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
  Flex,
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

  const itemExists = AppFunctions.getSavedListInLocalStorage().find(
    (item) => item.name === text.toUpperCase()
  );

  //FUNCTIONS
  const addItemToList = (e) => {
    e.preventDefault();

    // check that data entered is correct
    const isANumber = !isNaN(text);
    const emptyPrice = price === -1;
    const savedList = AppFunctions.getSavedListInLocalStorage();

    if (itemExists) {
      //increase this item qty
      const updatedItem = savedList.filter((i) => {
        return i.name === text.toUpperCase();
      });
      updatedItem[0].quantity++;

      const otherProducts = savedList.filter((i) => {
        return i.name !== text.toUpperCase();
      });

      const newList = [...otherProducts, updatedItem[0]];

      AppFunctions.saveListToLocalSorage(newList);
      e.target.reset();
      onClose();
      reloadShoppingList();
    } else if (
      typeof text == !"string" ||
      text.length < 3 ||
      text.length > 21 ||
      isANumber
    ) {
      alert("Please enter a valid name (3 - 20 characters) ");
    } else if (isNaN(price) || emptyPrice || price > 100000) {
      alert("Please enter a valid price (max 100 000)");
    } else {
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
      onClose();
      reloadShoppingList();
     
    }
  };

  // edit an item
  const editItem = (e) => {
    e.preventDefault();

    const currentList = JSON.parse(localStorage.getItem("list"));

    const product = currentList.filter(function (i) {
      return i.id === item.id;
    });

    if (text) {
      product[0].name = text.toUpperCase();
    } else {
      product[0].name = item.name;
    }

    if (!price || price === -1) {
      product[0].price = item.price;
    } else {
      product[0].price = price;
    }

    if (quantity) {
      product[0].quantity = quantity;
    } else {
      product[0].price = item.quantity;
    }

    const otherProducts = currentList.filter(function (i) {
      return i.id !== item.id;
    });
    otherProducts.push(product[0]);
    localStorage.setItem("list", JSON.stringify(otherProducts)); //save updated list

    e.target.reset();
    onClose();
    reloadShoppingList();
  };

  if (edit) {
    return (
      <>
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent
          
          >
            <div className="modal">
              <form onSubmit={editItem}>
                <ModalHeader>{label}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setText(e.target.value)}
                
                    placeholder={item.name}
                  ></input>

                  <input
                    type="text"
                    id="price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={item.price}
                  ></input>

                  <Select
                  
                  w="100%"
                  marginTop="3px"
                  
                  borderRadius="50px"
                  
                    placeholder={item.quantity}
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
                </ModalBody>

                <ModalFooter
                bg="none"
                >
                  <Button

                     h={30}
                     w="90px"
                     
                     bg="var(--ikeaGreyHover)"
                     color="var(--ikeaGreyTextAndIcon)"
                     borderRadius="50em"
                     marginRight="12px"
                     
                    onClick={onClose}
                    _hover={{ border: "1px solid var(--ikeaGreyTextAndIcon)" }}

                    
                  >
                    Close
                  </Button>

                  <Button
                  type="submit"
                  h={30}
                  
                  bg="var(--ikeaBlue)"
                  color="white"
                  
                  borderRadius="50em"
                  _hover={{ bg: "var(--ikeaBlueHover)" }}
                    
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



  } else if (add || zoom) {
    return (
      <>
        {add && (
          <Button
          h="2rem"
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

        {zoom && (
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
        )}

        <Modal 
        size="xs"
        
        blockScrollOnMount={false}
        motionPreset="slideInBottom"
        trapFocus={false}
        
        isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent
          
          >
            <div className="modal">
              <form onSubmit={add ? addItemToList : editItem}>
                {(add || edit) && <ModalHeader>{label}</ModalHeader>}
               
                <ModalCloseButton borderRadius="50em" />

                {(add || edit) && (
                  <ModalBody
                  w="95%"
                  >
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setText(e.target.value)}
                      onFocus={(e) => {
                        e.target.value = "";
                      }}
                      placeholder={add ? "Enter a new item..." : "edit"}
                    ></input>

                    {!itemExists && (
                      <>
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

                        <Select
                        
                        w="100%"
                        marginTop="3px"
                        fontSize="inherit"
                        borderRadius="50px"
                          placeholder="Quantity"
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
                    )}
                  </ModalBody>
                )}

                {zoom && (
                  <ModalBody>
                    <img className="img-zoom" src={item.url} alt="imgproduct" />
                  </ModalBody>
                )}

{add && (
                <ModalFooter
                bg="none">
                  <Button
                    
                    h="2rem"
                    w="90px"
                    fontSize="var(--fs)"
                    bg="var(--ikeaGreyHover)"
                    color="var(--ikeaGreyTextAndIcon)"
                    borderRadius="50em"
                    marginRight="12px"


                    onClick={onClose}
                    _hover={{ border: "1px solid var(--ikeaGreyTextAndIcon)" }}
                  >
                    Close
                  </Button>

                  <Button
                    type="submit"
                    h="2rem"
                    fontSize="var(--fs)"
                    bg="var(--ikeaBlue)"
                    color="white"
                    leftIcon="+"
                    borderRadius="50em"
                    _hover={{ bg: "var(--ikeaBlueHover)" }}
                  >
                    {label}
                  </Button>
                </ModalFooter>
                )}
                
              </form>
            </div>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <button className="btn btn-linear btn-pencil" onClick={onOpen}>
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
        </button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>{label}</ModalHeader>
            <ModalCloseButton />
            <Flex justify="center" align="center">
              <Dropzone item={item} />
            </Flex>
          </ModalContent>
        </Modal>
      </>
    );
  }
}
