import { useState, useEffect } from "react";
import React from "react";

import Item from "./Item";
import Overlay from "./Overlay";

export default function ShoppingList() {
  
  // CONSTANTS

  let previousList = JSON.parse(localStorage.getItem("list"));
  if (previousList == null) {
    previousList = [];
  }

  const sortedList = previousList.sort((a, b) => a.timestamp - b.timestamp);
  //console.log(sortedList)

  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [list, setList] = useState(sortedList);

  function handleClear() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <section className="shopping_list">

      <img className="img-main" src ="https://clecardona.com/summer_camp/eika/list.png" alt="img-main" />
      <h1>My Shopping-List</h1>
      

      <span className="legend">
        <div></div>
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
      </span>

      <div className="hr"></div>

      <ol>
        {list.map((item) => (
          <li key={item.id}>
            <Item item={item} list={list}/>
          </li>
        ))}
      </ol>

      <div className="buttons">
        <Overlay list={list} type={"addItem"}/>
        <button className="btn btn-oval btn-clear" onClick={handleClear}>CLEAR ALL ITEMS</button>
      </div>
    
    </section>
  );
}
