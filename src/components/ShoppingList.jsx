import { useState, useEffect } from "react";
import React from "react";

import Item from "./Item";
import Overlay from "./Overlay";
import ListHeader from "./ListHeader"
import Methods from "../services/Methods";


export default function ShoppingList() {
  // CONSTANTS

  // STATES
  const [filterResults, setFilterResults] = useState(
    Methods.getFilterSelected()
  );
  const [data, setData] = useState(Methods.getSavedListInLocalStorage());
  const [reload, setReload] = useState(false);

  //console.log("filter", filter);
  //console.log("sorted",sortedList)
  //console.log("filtered", filteredList, filteredList.length);

  function toggleFilter() {
    setFilterResults(!filterResults);
    Methods.saveFilterSelected(!filterResults);
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
          <ListHeader/>
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
            {/* todo - refactor */}
            {Methods.getOnlyAcquiredItems(data).map((item) => (
              <li key={item.id}>
                <Item item={item} reload={reload}/>
              </li>
            ))}

            {Methods.getOnlyAcquiredItems(data).length === 0 && (
              <span className="legend-middle">
                <p> No items found</p>
              </span>
            )}
          </div>
        ) : (
          <div>
            {data.map((item) => (
              <li key={item.id}>
                <Item item={item} reload={reload}/>
              </li>
            ))}
          </div>
        )}
      </ol>

     {/*  <ListFooter/> */}

      <div className="buttons">
        <Overlay type={"addItem"} />
        <button className="btn btn-oval btn-clear" onClick={handleClear}>
          CLEAR ALL ITEMS
        </button>
      </div>
    </section>
  );
}
