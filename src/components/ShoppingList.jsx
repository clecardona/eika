import { useState, useEffect } from "react";
import React from "react";

import Item from "./Item";
import Overlay from "./Overlay";
import Methods from "../services/Methods";

export default function ShoppingList() {
  // CONSTANTS


  // STATES
  const [filterResults, setFilterResults] = useState(false);
  const [data, setData] = useState(Methods.getSavedListInLocalStorage());
  
  
  //console.log("filter", filter);
  //console.log("sorted",sortedList)
  //console.log("filtered", filteredList, filteredList.length);

  function toggleFilter() {
    setFilterResults(!filterResults);
    //localStorage.setItem
  }

  function handleClear() {
    localStorage.clear();
    window.location.reload();
  }

 
  return (
    <section className="shopping_list">
      {data.length > 0 ? (
        <div>
          <div className="filter">
            <p>Show only acquired products</p>
            <div className="slider">
              <input
                type="checkbox"
                checked={filterResults}
                onChange={toggleFilter}
              />
            </div>
          </div>
          <span className="legend">
            <div></div>
            <p>Image</p>
            <p>Name</p>
            <p>Price</p>
          </span>
          <div className="hr"></div>
        </div>
      ) : (
        <div className="emptylist">
          <div className="arrowdown"></div>
          <p> Add your first item </p>
        </div>
      )}

      <ol>
        {filterResults ? (
          <div>{/* todo - refactor */}
            {
            
            Methods.getOnlyAcquiredItems(data).map((item) => (
             
             
             <li key={item.id}>
                <Item item={item} />
              </li>
            ))}

            {Methods.getOnlyAcquiredItems(data).length === 0 && <p> No items found </p>}
          </div>
        ) : (
          <div>
            {data.map((item) => (
              <li key={item.id}>
                <Item item={item} />
              </li>
            ))}
          </div>
        )}
      </ol>

      <div className="buttons">
        <Overlay type={"addItem"} />
        <button className="btn btn-oval btn-clear" onClick={handleClear}>
          CLEAR ALL ITEMS
        </button>
       
      </div>
    </section>
  );
}
