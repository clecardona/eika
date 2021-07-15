import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faEllipsisH,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";

import Overlay from "./Overlay";
import Methods from "../services/Methods";

export default function Item({ item }) {
  //constants
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const isAcquired = Methods.getSavedListInLocalStorage().filter((i) => {
    return i.id === item.id;
  })[0].acquired;

  //console.log(isAcquired )
  //const forceUpdate = useForceUpdate();

  // check an item - ok working
  function handleCheck() {
    const savedList = Methods.getSavedListInLocalStorage();
    const product = savedList.filter(function (i) {
      return i.id === item.id;
    });
    product[0].acquired = !product[0].acquired;

    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });
    otherProducts.push(product[0]);
    Methods.saveListToLocalSorage(otherProducts);
    setReload(!reload);
    window.location.reload();
  }

  // delete an item - ok working
  function handleDelete() {
    const savedList = Methods.getSavedListInLocalStorage();
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
      <div className="item-data">
        <div>
          <img className="img-product" src={item.url} alt="imgproduct" />
          <Overlay item={item} type={"addImage"} />
        </div>

        <span className = "data">{item.name}</span>
        <span className = "data">
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
            <FontAwesomeIcon icon={faTimesCircle} className="icon" size="2x" />
          </button>

          <div className="content">
            <Overlay type={"editItem"} item={item} />

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
