import { React, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Overlay from "react-overlay-component";

export default function AddItemOverlay({ list}) {
  //constants
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");

  class Product {
    constructor(id, name, price, url, acquired,timestamp) {
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

    let newList = [];
    if (list == null) {
      newList = [];
    } else {
      newList = [...list];
    }

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

    newList.push(newItem);
    //setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    e.target.reset();
    closeOverlay()
    window.location.reload()
  };


  return (
    <div>
    <button
        className="btn btn-oval btn-submit"
        onClick={() => {
          setOverlay(true);
        }}
      > ADD ITEM </button>

    <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
      <div className="overlay-form-group ">
        <form onSubmit={addItemToList}>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setText(e.target.value)}
            placeholder="enter a new item..."
          ></input>
          <input
            type="text"
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price"
          ></input>

          <input
            className="btn  btn-submit"
            type="submit"
            value="ADD ITEM"
          ></input>
        </form>
      </div>
    </Overlay>
    </div>
  );
}
