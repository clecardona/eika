import { useState, useEffect } from "react";
import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { v4 as uuidv4 } from 'uuid';

import Item from "./Item";


export default function ShoppingList() {

  class Product{
    constructor(id,name,price,url,acquired) {
      this.id=id;
      this.name = name;
      this.price = price;
      this.url = url;
      this.acquired=acquired;
    }
  }

 //localStorage.setItem("list", [item0]) 

  // CONSTANTS

  let previousList = JSON.parse(localStorage.getItem("list"));
  if(previousList == null){
  previousList = []
 }

  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [list, setList] = useState(previousList);


  const addItemToList = (e) => {
    e.preventDefault();

    let newList = [];
    if(list == null){
    newList = [];
    }else{
    newList = [...list];  
    }
    
    const defaultImgUrl ="https://www.pngitem.com/pimgs/m/24-246194_furniture-icon-png-free-transparent-png.png"
    let newItem = new Product(uuidv4(),text.toUpperCase(),price,defaultImgUrl,false)

    newList.push(newItem);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    e.target.reset();
  };

  
  //console.log("text",text)
  //console.log("price",price) 
  console.log("list", list);
  //console.log("localStorage", previousList);

function handleClear(){
  localStorage.clear()
  window.location.reload()
}

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
      <button onClick={handleClear}>clear items</button>
    </section>
  );
}
