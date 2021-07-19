import React,{ useState, useEffect } from "react";
import ModalComponent from "./ModalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEllipsisV,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";

import Overlay from "./Overlay";
import AppFunctions from "../services/AppFunctions";

export default function Item({item,reloadShoppingList}) {
  //constants
  const [open, setOpen] = useState(false);
  const isAcquired = AppFunctions.getSavedListInLocalStorage().filter((i) => {
    return i.id === item.id;
  })[0].acquired;

  //console.log(reloadComponent)

  // check an item
  function handleCheck() {
    const savedList = AppFunctions.getSavedListInLocalStorage();
    const product = savedList.filter(function (i) {
      return i.id === item.id;
    });
    product[0].acquired = !product[0].acquired;

    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });
    otherProducts.push(product[0]);
    AppFunctions.saveListToLocalSorage(otherProducts);
    
    reloadShoppingList()
  }

  // delete an item 
  function handleDelete() {
    const savedList = AppFunctions.getSavedListInLocalStorage();
    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });
    localStorage.setItem("list", JSON.stringify(otherProducts));
    window.location.reload(); // todo - reload only Item.jsx
  }

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div className={"item" + (open ? " item-open" : "")}>
      <div className="lisere"> </div>
      <div className={"item-data" + (isAcquired ? " item-data-acquired" : "")}>
        <div className="box-product">
          <div>
            <img className="img-product" src={item.url} alt="imgproduct" />
            <ModalComponent
          label={"Zoom"}
          reloadShoppingList={reloadShoppingList}
          button={true}
          zoom={true}
          item={item}
        />

          </div>
          <Overlay item={item} type={"addImage"} />
        </div>

        <span className="data">
          <p className="data-name">{item.name}</p>
          <p className="data-qty">x{item.quantity}</p>
          </span>
        <span className="data-price">
          <strong>{item.price} :-</strong>
        </span>

        <div class="exp">
          <div class="checkbox">
            <input
              type="checkbox"
              id={"cbx-" + item.id}
              name="check"
              checked={isAcquired}
              onChange={handleCheck}
            />
            <label for={"cbx-" + item.id}>
              <span></span>
            </label>
          </div>
        </div>
      </div>

      {open === true ? (
        <div className="drawer">
          <button className="btn btn-roll btn-drawer" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faEllipsisV} className="icon" size="2x" />
          </button>

          <div className="content">
            <Overlay type={"editItem"} item={item} reloadShoppingList={reloadShoppingList}/>

            <button className="btn btn-roll btn-delete" onClick={handleDelete}>
              <FontAwesomeIcon
                icon={faMinusCircle}
                className="icon"
                size="2x"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="drawer">
          <button className="btn btn-drawer" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faEllipsisH} className="icon" size="2x" />
          </button>
        </div>
      )}
    </div>
  );
}
