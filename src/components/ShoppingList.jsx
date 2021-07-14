import { useState } from "react";
import React from "react";

import Item from "./Item";
import Overlay from "./Overlay";
import Methods from "../services/Methods";

export default function ShoppingList() {
  // CONSTANTS

  const savedList = Methods.getSavedListInLocalStorage();
  const filteredList = Methods.getOnlyAcquiredItems(savedList);

  // STATES
  const [filterResults, setFilterResults] = useState(false);

  //console.log("filter", filter);
  //console.log("sorted",sortedList)
  console.log("filtered", filteredList, filteredList.length);

  function toggleFilter() {
    setFilterResults(!filterResults);
  }

  function handleClear() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <section className="shopping_list">
      <img
        className="img-main"
        src="https://clecardona.com/summer_camp/eika/list.png"
        alt="img-main"
      />
      <h1 id="title">My Shopping-List</h1>

      {savedList.length > 0 ? (
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
          <div>
            {filteredList.map((item) => (
              <li key={item.id}>
                <Item item={item} />
              </li>
            ))}

            {filteredList.length === 0 && <p> No items found </p>}
          </div>
        ) : (
          <div>
            {savedList.map((item) => (
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
