import { useState, useEffect } from "react";
import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import Item from "./Item";

export default function ShoppingList() {
  var item0 = {
    imageUrl:
      "https://www.ikea.com/se/sv/images/products/droemsk-kruka-inom-utomhus-moerkbla__0990174_pe820972_s5.jpg?f=xxxl",
    name: "DRÖMSK",
    price: 79,
    acquired: true,
  };

  // CONSTANTS

  const previousList = JSON.parse(localStorage.getItem("list"));

  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [list, setList] = useState(previousList);


  const addItemToList = (e) => {
    e.preventDefault();

    const newList = [...list];
    newList.push({
      imageUrl:
        "https://www.pngitem.com/pimgs/m/24-246194_furniture-icon-png-free-transparent-png.png",
      name: text.toUpperCase(),
      price: price,
      acquired: false,
    });
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    e.target.reset();
  };


  
  //onsole.log("text",text)
  //console.log("price",price) 
  //console.log("list", list);
  //console.log("prevList", previousList);

  return (
    <section className="shopping_list">
      <h1>My Shopping-List</h1>

      <span className ="legend">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
      </span>
  
      <div className="hr"></div>
      
      {list.map((item) => (
        <React.Fragment >
          <Item
          
          id={item.id}
          item={item} 
          />
          
        </React.Fragment>
      ))}


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
    </section>
  );
}
