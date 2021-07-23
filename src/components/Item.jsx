import React, { useState} from "react";
import ModalComponent from "./ModalComponent";
import ModalAddEdit from "./ModalAddEdit";
import AppFunctions from "../services/AppFunctions";
import ItemName from "./ItemName";

export default function Item({ item, reloadShoppingList,deleteItem }) {
  //constants
  const [open, setOpen] = useState(false);
  const isAcquired = item.acquired;
  
  // check an item
  function handleCheck() {
    const product = {...item}
    product.acquired = !product.acquired;
    const otherProducts = AppFunctions.getRestOfTheListById(item.id)
    AppFunctions.saveListToLocalSorage([...otherProducts, product]);
    reloadShoppingList();
  }

  // delete an item
  function handleDelete() {
    const otherProducts = AppFunctions.getRestOfTheListById(item.id); // put logic into parent by lifting
    deleteItem(otherProducts)
    
  }

  function toggleDrawer() {
    setOpen(!open);
  }

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
            <img className="img-product" src={item.url} alt="imgproduct" />
           
            <ModalComponent
              label={"Current Image"}
              reloadShoppingList={reloadShoppingList}
              item={item}
            />
          </div>

        </div>

        <ItemName item={item}/>



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
          <button className="btn btn-linear" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="drawer">
          <button className="btn btn-linear" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
