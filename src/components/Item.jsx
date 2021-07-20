import React, { useState, useEffect } from "react";
import ModalComponent from "./ModalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEllipsisV,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Overlay from "./Overlay";
import AppFunctions from "../services/AppFunctions";

export default function Item({ item, reloadShoppingList }) {
  //constants
  const [open, setOpen] = useState(false);
  const isAcquired = AppFunctions.getSavedListInLocalStorage().filter((i) => {
    return i.id === item.id;
  })[0].acquired;

  //console.log(reloadComponent)

  // check an item
  function handleCheck() {
    const product = AppFunctions.getItemById(item.id);
    product.acquired = !product.acquired;

    const otherProducts = AppFunctions.getSavedListInLocalStorage().filter(
      (i) => {
        return i.id !== item.id;
      }
    );

    AppFunctions.saveListToLocalSorage([...otherProducts, product]);
    reloadShoppingList();
  }

  // delete an item
  function handleDelete() {
    const otherProducts = AppFunctions.getRestOfTheListById(item.id);

    AppFunctions.saveListToLocalSorage(otherProducts);
    window.location.reload(); // todo - reload only SL.jsx
  }

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div className={"item" + (open ? " item-open" : "") + (isAcquired ? " item-acquired" : "")}>
      <div className="lisere"> </div>
      <div className={"item-data" }>
        <div className="box-product">
          <div className="wrapper">
            <img className="img-product" src={item.url} alt="imgproduct" />
            <ModalComponent 
              label={"Zoom"}
              reloadShoppingList={reloadShoppingList}
              button={true}
              zoom={true}
              item={item}
            />
          </div>
          
          <ModalComponent
          label={"Edit image"}
          reloadShoppingList={reloadShoppingList}
          item={item}
        />
        </div>

        <span className="data">
          <p>
            <strong>{item.quantity}x</strong> {item.name}
          </p>
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
           {/*  <Overlay
              type={"editItem"}
              item={item}
              reloadShoppingList={reloadShoppingList}
            /> */}

            <ModalComponent
          label={"Edit item"}
          reloadShoppingList={reloadShoppingList}
          button={true}
          edit={true}
          item={item}
        />

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
