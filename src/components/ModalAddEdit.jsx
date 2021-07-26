import React, { useState } from "react";
import AppFunctions from "../services/AppFunctions";
import { Pencil } from "react-bootstrap-icons";

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

export default function ModalAddEdit({
  item,
  label,
  reloadShoppingList,
  add,
  edit,
}) {
  //constants

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [text, setText] = useState("");
  const [price, setPrice] = useState(-999);
  const [quantity, setQuantity] = useState(1);

  const itemExists = AppFunctions.getSavedListInLocalStorage().some(
    (item) => item.name === text.toUpperCase()
  );
  const priceIsValid = AppFunctions.isPriceCorrect(price) || price === -999;
  const nameIsValid = AppFunctions.isNameCorrect(text) || text === "";

  //FUNCTIONS
  function closeModal() {
    //e.target.reset();
    setText("");
    setPrice(-999);
    onClose();
    reloadShoppingList();
  }

  const addItemToList = (e) => {
    e.preventDefault();
    if (AppFunctions.isDataCorrect(text, price)) {
      AppFunctions.addItem(text, price, quantity);
      closeModal();
    }
  };

  const editItem = (e) => {
    e.preventDefault();
    AppFunctions.editItem(item, text, price, quantity);
    closeModal();
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
          <Pencil className="btn btn-sm" />
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
                    {[...Array(26).keys()].slice(1).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
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
                {!priceIsValid && (
                  <Text
                    w="100%"
                    marginTop="5px"
                    textAlign="center"
                    fontSize="var(--fs)"
                    color="tomato"
                  >
                    Please enter a valid price ( max 100 000 :- )
                  </Text>
                )}

                {!nameIsValid && (
                  <Text
                    w="100%"
                    marginTop="5px"
                    textAlign="center"
                    fontSize="var(--fs)"
                    color="tomato"
                  >
                    Please enter a valid name (3 - 15 characters)
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
                  disabled={itemExists || !priceIsValid || !nameIsValid}
                  h="2rem"
                  fontSize="var(--fs)"
                  bg="var(--ikeaBlue)"
                  color="white"
                  leftIcon={add ? "+" : <Pencil className="btn btn-sm" />}
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
