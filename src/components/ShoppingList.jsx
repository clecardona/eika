import { useState, useEffect, React } from "react";
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
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [list,setList] = useState([item0]);
  
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])

  var retrievedList = JSON.parse(localStorage.getItem("list")); 


const addItemToList = (e) => {
  e.preventDefault();

const newItem = {
  imageUrl:
    "https://www.ikea.com/global/assets/navigation/images/mattresses-bm002.jpeg?imwidth=300",
  name: text,
  price: price,
  acquired: false,
};

  const newList = [...list]
  newList.push(newItem)

  setList(newList)
  e.target.reset()
}

  /* console.log("text",text)
  console.log("price",price) */
  console.log("list",list)
  console.log("retrievedList",retrievedList)


  return (
    <section className="shopping_list">
      <h1>My Shopping-List</h1>

      {/* <React.Fragment> */}
      {/* <Item data ={data}/> */}
      {/* </React.Fragment> */}


<form onSubmit={addItemToList} >

  <input type="text" id="name" name="name" onChange={(e) => setText(e.target.value)} placeholder="enter a new item..."></input> 
  <input type="text" id="price" name="price" onChange={(e) => setPrice(e.target.value)} placeholder="price"></input> 
  
  <input type="submit" value="Add item"></input>
</form>
    </section>
  );
}
