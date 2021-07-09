import { prettyDOM } from "@testing-library/react";
import { useState, useEffect } from "react";

export default function Item({item}) {
  
 
  const id = item.id
//console.log(item)
//console.log(list)
 
  function handleCheck(){
    const previousList = JSON.parse(localStorage.getItem("list"));
    const updatedList = [...previousList];
    //console.log(updatedList)
    //console.log(id)
    const product = updatedList
    .filter(function (i) {
      return i.id === id;
    })
    product[0].acquired = !product[0].acquired

    const otherProducts = updatedList
    .filter(function (i) {
      return i.id !== id;
    })

    //console.log(otherProducts)
    otherProducts.push(product[0])
    console.log(otherProducts)

    //find the item by id
    //change the acquired to !acquired
    localStorage.setItem("list", JSON.stringify(otherProducts)); //save updated list
    window.location.reload()
 }

 function handleDelete(){
  const previousList = JSON.parse(localStorage.getItem("list"));
  const updatedList = [...previousList]; 
  const otherProducts = updatedList
  .filter(function (i) {
    return i.id !== id;
  })
  localStorage.setItem("list", JSON.stringify(otherProducts)); //save updated list
  window.location.reload() 

 }

  return (
    
      <div className="item">
        <img src={item.url} alt="imgproduct" />
        <span>{item.name}</span>
        <span><strong>{item.price}:-</strong></span>
        <input type="checkbox" checked = {item.acquired} onChange={handleCheck}/>
      
      
      <div className="modifiers">
      <button onClick={handleDelete}> delete </button>
      <button>edit</button>
      </div>
      
      </div> 
    
  );
}
