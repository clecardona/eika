import { useState, useEffect } from "react";

export default function Item({data}) {
  console.log(data);

  return (
    <section className="shopping_list">
     
     <div className="item">
        <img src={data[0].imageUrl} alt="imgproduct" />
        <span>{data[0].name}</span>
        <span><strong>{data[0].price}:-</strong></span>
        <input type="checkbox"/>
      
      </div>
    </section>
  );
}
