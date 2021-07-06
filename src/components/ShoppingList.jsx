import { useState, useEffect } from "react";

export default function ShoppingList() {
  const item0 = {
    imageUrl:
      "https://www.ikea.com/se/sv/images/products/droemsk-kruka-inom-utomhus-moerkbla__0990174_pe820972_s5.jpg?f=xxxl",
    name: "DRÖMSK",
    price: 79,
    acquired: true,
  };
  const [data, setData] = useState([item0]);

  console.log(data[0].imageUrl);

  return (
    <section className="shopping_list">
      <h1>My Shopping-List</h1>

      <div className="item">
        <img src={data[0].imageUrl} alt="imgproduct" />
        <span>{data[0].name}</span>
        <span><strong>{data[0].price}:-</strong></span>
        <input type="checkbox"/>
      </div>

    </section>
  );
}
