// External imports
import React, { useState } from "react";
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
  Text,
  Select,
} from "@chakra-ui/react";

// Local imports
import AppFunctions from "../services/AppFunctions";

export default function ModalAddEdit({
  item,
  label,
  reloadShoppingList,
  add,
  edit,
}) {
  //States
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [text, setText] = useState("");
  const [price, setPrice] = useState(-999);
  const [quantity, setQuantity] = useState(1);

  const itemExists = AppFunctions.getSavedListInLocalStorage().some(
    (item) => item.name === text.toUpperCase()
  );
  const priceIsValid = AppFunctions.isPriceCorrect(price) || price === -999;
  const nameIsValid = AppFunctions.isNameCorrect(text) || text === "";

  //Functions
  function closeModal() {
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

  // Again your JSX is too complex and nested. In case like this, make a folder called modal-add-edit and refactor stuff to put sub components there and make ModalAddEdit call them
  return (
    <>
      {add && (
        <div className="btn-large btn-sort btn-blue">
          <input
            className="check-with-label"
            type="checkbox"
            id="add"
            onClick={onOpen}
          />
          <label className="label-for-check" htmlFor="add">
            {label}
          </label>
        </div>
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

        <ModalContent borderRadius="0px">
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
                <div className="btn-margin btn-sort btn-reset ">
                  <input
                    className="check-with-label"
                    type="button"
                    id="close"
                    onClick={onClose}
                  />
                  <label className="label-for-check" htmlFor="close">
                    Close
                  </label>
                </div>

                <div className="btn-sort btn-blue">
                  <input
                    className="check-with-label"
                    type="submit"
                    id="submit"
                    disabled={itemExists || !priceIsValid || !nameIsValid}
                  />
                  <label
                    className={
                      "label-for-check" +
                      (itemExists || !priceIsValid || !nameIsValid
                        ? " is-disabled"
                        : "")
                    }
                    htmlFor="submit"
                  >
                    {label}
                  </label>
                </div>
              </ModalFooter>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
