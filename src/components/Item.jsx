import { prettyDOM } from "@testing-library/react";
import { useState, useEffect } from "react";

export default function Item({id,item}) {
  
 
  
// console.log(item)
 
  function handleCheck(){
    const previousList = JSON.parse(localStorage.getItem("list"));
    const updatedList = [...previousList];
    //find the item by id
    //change the acquired to !acquired
    localStorage.setItem("list", JSON.stringify(updatedList)); //save updated list
 }

  return (
    <section  className="shopping_list">
     
      <div className="item">
        <img src={item.url} alt="imgproduct" />
        <span>{item.name}</span>
        <span><strong>{item.price}:-</strong></span>
        <input type="checkbox" checked = {item.acquired} onChange={handleCheck}/>
      
      
      <div className="modifiers">
      <button>delete</button>
      <button>edit</button>
      </div>
      
      </div> 
    </section>
  );
}
