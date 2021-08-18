//External imports
import React, { useState } from "react";
import { Trash, X, ThreeDotsVertical } from "react-bootstrap-icons";

//Local imports
import AppFunctions from "../services/AppFunctions";

import ModalPicture from "./ModalPicture";
import ModalAddEdit from "./ModalAddEdit";
import ItemName from "./ItemName";

export default function Item({ item, reloadShoppingList, deleteItem }) {
  //States
  const [open, setOpen] = useState(false);
  const isAcquired = item.acquired;

  // Functions
  function handleCheck() {
    AppFunctions.toggleCheck(item);
    reloadShoppingList();
  }

  function handleDelete() {
    const otherProducts = AppFunctions.getRestOfTheListById(item.id);
    deleteItem(otherProducts);
  }

  function toggleDrawer() {
    setOpen(!open);
  }

  // There is too much jsx for a single item, break it into sub components.
  // I did the same for my shopping item, where the Checkbox and the Imagechooser where separate components.
  // Your app has more functionality than mine, but not 10X more functioanlity to have 10X more lines of code than mine.
  return (
    <div
      className={
        "item" +
        (open ? " item-open" : "") +
        (item.acquired ? " item-acquired" : "")
      }
    >
      <div className="lisere"> </div>
      <div className={"item-data"}>
        <div className="box-product">
          <div className="wrapper">
            <div className="img-container">
              <img className="img-product" src={item.url} alt="imgproduct" />
            </div>
            <ModalPicture
              label={"Current Image"}
              reloadShoppingList={reloadShoppingList}
              item={item}
            />
          </div>
        </div>

        <ItemName item={item} />

        <span className="data-price">
          <strong>{item.price}:-</strong>
        </span>

        <div className="exp">
          <div className="checkbox">
            <input
              type="checkbox"
              id={"cbx-" + item.id}
              name="check"
              checked={isAcquired}
              onChange={handleCheck}
            />
            <label htmlFor={"cbx-" + item.id}>
              <span></span>
            </label>
          </div>
        </div>
      </div>

      {open === true ? (
        <div className="drawer">
          <button className="btn btn-linear" onClick={toggleDrawer}>
            <X className="btn btn-sm" />
          </button>

          <div className="content">
            <ModalAddEdit
              label={"Edit item"}
              reloadShoppingList={reloadShoppingList}
              button={true}
              edit={true}
              add={false}
              item={item}
            />

            <button className="btn btn-linear" onClick={handleDelete}>
              <Trash className="btn btn-sm" />
            </button>
          </div>
        </div>
      ) : (
        <div className="drawer">
          <button className="btn btn-linear" onClick={toggleDrawer}>
            <ThreeDotsVertical className="btn btn-sm" />
          </button>
        </div>
      )}
    </div>
  );
}
