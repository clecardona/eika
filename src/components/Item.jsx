import { prettyDOM } from "@testing-library/react";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faTimesCircle,
  faCog,
  faEllipsisH, faAngleRight,faMinusCircle
} from "@fortawesome/free-solid-svg-icons";

import Overlay from "./Overlay";

export default function Item({ item, list }) {
  
  //constants
  const [open, setOpen] = useState(false);
  
  //console.log(open)
  console.log(list)

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

  function toggleDrawer(){
  setOpen(!open)
  }

  return (
    <div className={"item" + (open ? ' item-open':'')} >

      <div className="lisere"> </div>
      <div className="item-data">
        <div>
          <img src={item.url} alt="imgproduct" />
          <Overlay list={list} type={"addImage"} />
        </div>

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


      { open === true  ?  

      <div className="drawer">
        <button className="btn btn-roll btn-drawer" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={faTimesCircle} className="icon" size="2x" />
        </button>

          
          <div className="content">
          <Overlay list={list} type={"editItem"} item={item} />

          <button className="btn btn-roll btn-delete" onClick={handleDelete}>
            <FontAwesomeIcon icon={faMinusCircle} className="icon" size="2x" />
          </button>
        </div>
        </div>
        :
        <div className="drawer">
        <button className="btn btn-drawer" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={faEllipsisH} className="icon" size="2x" />
        </button>
        </div>
 
      
    }  


    </div>
  );
}
