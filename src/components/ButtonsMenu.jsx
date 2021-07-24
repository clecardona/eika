import React from "react";
import ModalAddEdit from "./ModalAddEdit";


export default function ButtonsMenu({reloadShoppingList,handleClear,length}) {
  return (
    <div className="buttons">

        <ModalAddEdit
          label={"Add item"}
          reloadShoppingList={reloadShoppingList}
          add={true}
          edit={false}
        />
      

        {length > 0 && (
        
          <div className="btn-sort btn-reset btn-clear">
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
