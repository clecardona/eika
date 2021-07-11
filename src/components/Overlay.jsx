import { React, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Overlay from "react-overlay-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function AddItemOverlay({ list, type }) {
  //constants
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");

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
    // check data
    if (typeof text == !"string") {
      alert("Please enter a valid name");
      return;
    }

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
    closeOverlay();
    window.location.reload();
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
            <div className="overlay-form-group ">
              <form /* onSubmit={editItem} */>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="update name"
                ></input>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="update price"
                ></input>

                <input
                  className="btn  btn-submit"
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
         
          <button className="btn img-overlay"onClick={() => {
                setOverlay(true);
              }}  >+</button>

          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}
          >
            <div className="overlay-form-group ">
              <form /* onSubmit={editItem} */>
                
                <div className="dropzone">DROPZONE</div>

                <input
                  className="btn  btn-submit"
                  type="submit"
                  value="EDIT ITEM"
                ></input>
              </form>
            </div>
          </Overlay>
        </div>
      )}



    </div>
  );
}
