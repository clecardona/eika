import { useState, useEffect } from "react";
import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { v4 as uuidv4 } from "uuid";

import Item from "./Item";

export default function ShoppingList() {
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

  //localStorage.setItem("list", [item0])

  // CONSTANTS

  let previousList = JSON.parse(localStorage.getItem("list"));
  if (previousList == null) {
    previousList = [];
  }
  
  const sortedList = previousList.sort((a, b) => a.timestamp - b.timestamp)
  //console.log(sortedList)


  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [list, setList] = useState(sortedList);

  const addItemToList = (e) => {
    e.preventDefault();

    let newList = [];
    if (list == null) {
      newList = [];
    } else {
      newList = [...list];
    }

    const defaultImgUrl =
      "https://www.pngitem.com/pimgs/m/24-246194_furniture-icon-png-free-transparent-png.png";
    let newItem = new Product(
      uuidv4(),
      text.toUpperCase(),
      price,
      defaultImgUrl,
      false,
      Date.now()
    );

    newList.push(newItem);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    e.target.reset();
  };

  //console.log("text",text)
  //console.log("price",price)
  //console.log("list", list);
  //console.log("localStorage", previousList);

  function handleClear() {
  localStorage.clear();
    window.location.reload();
  }

  return (
    <section className="shopping_list">
      <h1>My Shopping-List</h1>

      <span className="legend">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
      </span>

      <div className="hr"></div>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <Item item={item}/>
          </li>
        ))}
      </ul>

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

        <input type="submit" value="Add item"></input>
      </form>
      <button onClick={handleClear}>clear items</button>
    </section>
  );
}
