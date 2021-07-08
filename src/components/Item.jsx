import { prettyDOM } from "@testing-library/react";
import { useState, useEffect } from "react";

export default function Item({id,item}) {
  
  
// console.log(item)
 
  function handleCheck(){
  
  
 }

  return (
    <section  className="shopping_list">
     
      <div className="item">
        <img src={item.imageUrl} alt="imgproduct" />
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
