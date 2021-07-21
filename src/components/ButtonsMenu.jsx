import React from "react";
import ModalComponent from "./ModalComponent";


export default function ButtonsMenu({reloadShoppingList,handleClear,length}) {
  return (
    <div className="buttons">

        <ModalComponent
          label={"Add item"}
          reloadShoppingList={reloadShoppingList}
          button={true}
          add={true}
        />

        {length > 0 && (
        
          <div className="btn-sort">
          <input
            className="check-with-label"
            type="checkbox"
            id="clear"
            checked={false}
            onClick={handleClear}
          />
          <label className="label-for-check" htmlFor="clear">
          Clear List
          </label>
        </div>


        )}
        
      </div>
  );
}
