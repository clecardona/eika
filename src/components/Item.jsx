import { useState, useEffect } from "react";

export default function Item({url,name,price}) {
  

  return (
    <section className="shopping_list">
     
      <div className="item">
        <img src={url} alt="imgproduct" />
        <span>{name}</span>
        <span><strong>{price}:-</strong></span>
        <input type="checkbox"/>
      
      </div> 
    </section>
  );
}
