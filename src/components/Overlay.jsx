import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Overlay from "react-overlay-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faGlasses } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "./Dropzone";
import Methods from "../services/Methods";

export default function AddItemOverlay({  type, item }) {
  //constants
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

  //Manage the overlay
  const [isOpen, setOverlay] = useState(false);
  const closeOverlay = () => setOverlay(false);

  //overlay configuration
  const configs = {
    animate: true,
    clickDismiss: true,
    escapeDismiss: true,
    focusOutline: true,
  };

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
      const savedList = Methods.getSavedListInLocalStorage();

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
      Methods.saveListToLocalSorage(savedList);

      e.target.reset();
      closeOverlay();
      window.location.reload();
    }
  };

  // edit an item - todo
  const editItem = (e) => {
    e.preventDefault();
    // check that data entered is correct
    if (
      typeof text == !"string" ||
      text.length === 0 ||
      text.length > 20 ||
      !isNaN(text)
    ) {
      alert("Please enter a valid name (max 20 characters) ");
    } else if (isNaN(price) || price === -1 || price > 100000) {
      alert("Please enter a valid price (max 100 000)");
    } else {
      const currentList = JSON.parse(localStorage.getItem("list"));
      const product = currentList.filter(function (i) {
        return i.id === item.id;
      });

      product[0].name = text.toUpperCase();
      product[0].price = price;

      const otherProducts = currentList.filter(function (i) {
        return i.id !== item.id;
      });
      otherProducts.push(product[0]);
      localStorage.setItem("list", JSON.stringify(otherProducts)); //save updated list
      window.location.reload();
    }
  };

  return (
    <div>
      {type === "addItem" && (
        <div>
          <button
            className="btn btn-oval btn-submit"
            onClick={() => {
              setOverlay(true);
            }}
          >
            {" "}
            ADD ITEM{" "}
          </button>

          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}
          >
            <div className="overlay ">
              <form onSubmit={addItemToList}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter a new item..."
                ></input>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                ></input>

                <input
                  className="btn btn-oval btn-submit"
                  type="submit"
                  value="ADD ITEM"
                ></input>
              </form>
            </div>
          </Overlay>
        </div>
      )}

      {type === "editItem" && (
        <div>
          <button className="btn btn-roll btn-edit">
            <FontAwesomeIcon
              icon={faCog}
              className="icon"
              onClick={() => {
                setOverlay(true);
              }}
              size="2x"
            />
          </button>

          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}
          >
            <div className="overlay ">
              <form onSubmit={editItem}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Update name"
                ></input>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                ></input>

                <input
                  className="btn btn-oval btn-submit"
                  type="submit"
                  value="EDIT ITEM"
                ></input>
              </form>
            </div>
          </Overlay>
        </div>
      )}

      {type === "addImage" && (
        <div>
          <button
            className="btn btn-edit"
            onClick={() => {
              setOverlay(true);
            }}
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
          </button>

          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}
          >
            <div className="overlay-dropzone">
              <Dropzone item={item} />
            </div>
          </Overlay>
        </div>
      )}

      {type === "zoom" && (
        <div>
          <button
            className="btn img-overlay"
            onClick={() => {
              setOverlay(true);
            }}
          >
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

          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}
          >
            <div className="overlay">
            <img className="img-zoom" src={item.url} alt="imgproduct" />
            </div>
          </Overlay>
        </div>
      )}
    </div>
  );
}
