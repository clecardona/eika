import { prettyDOM } from "@testing-library/react";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faTimesCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";

export default function Item({ item }) {
  //console.log(item)
  //console.log(list)

  // check an item - ok working
  function handleCheck() {
    const currentList = JSON.parse(localStorage.getItem("list"));
    const product = currentList.filter(function (i) {
      return i.id === item.id;
    });
    product[0].acquired = !product[0].acquired;

    const otherProducts = currentList.filter(function (i) {
      return i.id !== item.id;
    });
    otherProducts.push(product[0]);
    localStorage.setItem("list", JSON.stringify(otherProducts)); //save updated list
    window.location.reload();
  }

  // delete an item - ok working
  function handleDelete() {
    const currentList = JSON.parse(localStorage.getItem("list"));
    const otherProducts = currentList.filter(function (i) {
      return i.id !== item.id;
    });
    localStorage.setItem("list", JSON.stringify(otherProducts));
    window.location.reload();
  }

  return (
    <div className="item">
      <button className="btn btn-roll btn-edit">
        <FontAwesomeIcon icon={faCog} className="icon" size="2x" />
      </button>
<div className = "item-data">
      <img src={item.url} alt="imgproduct" />
      <span>{item.name}</span>
      <span>
        <strong>{item.price}:-</strong>
      </span>

      <input
        className="checkbox"
        type="checkbox"
        checked={item.acquired}
        onChange={handleCheck}
      />
</div>

      <button className="btn btn-roll btn-delete" onClick={handleDelete}>
        {" "}
        <FontAwesomeIcon icon={faTimesCircle} className="icon" size="2x" />{" "}
      </button>
    </div>
  );
}
