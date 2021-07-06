import { useState, useEffect,React } from "react";
import Item from "./Item"

export default function ShoppingList() {
  var item0 = {
    imageUrl:
      "https://www.ikea.com/se/sv/images/products/droemsk-kruka-inom-utomhus-moerkbla__0990174_pe820972_s5.jpg?f=xxxl",
    name: "DRÖMSK",
    price: 79,
    acquired: true,
  };
// Put the object into storage
localStorage.setItem('item0', JSON.stringify(item0));
// Retrieve the object from storage
var retrievedObject = JSON.parse(localStorage.getItem('item0'));

  const [data, setData] = useState([retrievedObject]);

  //console.log(data);

  return (
    <section className="shopping_list">
      <h1>My Shopping-List</h1>
      
      {/* <React.Fragment> */}
      <Item data ={data}/>
      <Item data ={data}/>
      {/* </React.Fragment> */}

    </section>
  );
}
