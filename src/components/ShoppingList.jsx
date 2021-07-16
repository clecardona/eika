import { useState, useEffect } from "react";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import Item from "./Item";
import Overlay from "./Overlay";
import ListHeader from "./ListHeader";
import Methods from "../services/Methods";

export default function ShoppingList() {
  // CONSTANTS

  // STATES
  const [filterResults, setFilterResults] = useState(
    Methods.getFilterSelected()
  );
  const [data, setData] = useState(Methods.getSavedListInLocalStorage());

  //sorting states
  const [sortBy, setSortBy] = useState(Methods.getSortBySelected());

  function sortByName() {
    setSortBy("name");
    Methods.saveSortBySelected("name");
  }

  function sortByPrice() {
    setSortBy("price");
    Methods.saveSortBySelected("price");
  }

  function sortByTimestamp() {
    setSortBy("timestamp");
    Methods.saveSortBySelected("timestamp");
  }

  console.log(sortBy);

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
          <div className="filter-sort">
            <div className="sort">
              <p>Sort by : </p>

              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="name"
                  checked={sortBy === "name"}
                  onClick={sortByName}
                />
                <label className="label-for-check" htmlFor="name">
                  Name ⬆
                </label>
              </div>

              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="price"
                  checked={sortBy === "price"}
                  onClick={sortByPrice}
                />

                <label className="label-for-check" htmlFor="price">
                  Price ⬆
                </label>
              </div>

              <button className="btn-sort icon" onClick={sortByTimestamp}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="icon"
                  size="1x"
                />
                <p></p>
              </button>
            </div>
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
          </div>
          <ListHeader />
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
            {sortBy === "price" && (
              <div>
                {Methods.sortByPrice(Methods.getOnlyAcquiredItems(data)).map(
                  (item) => (
                    <li key={item.id}>
                      <Item item={item} />
                    </li>
                  )
                )}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {Methods.sortByName(Methods.getOnlyAcquiredItems(data)).map(
                  (item) => (
                    <li key={item.id}>
                      <Item item={item} />
                    </li>
                  )
                )}
              </div>
            )}

            {sortBy === "timestamp" && (
              <div>
                {Methods.sortByTimestampOlderFirst(
                  Methods.getOnlyAcquiredItems(data)
                ).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}

            {Methods.getOnlyAcquiredItems(data).length === 0 && (
              <span className="legend-middle">
                <p> No items found</p>
              </span>
            )}
          </div>
        ) : (
          <div>
            {sortBy === "price" && (
              <div>
                {Methods.sortByPrice(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {Methods.sortByName(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}

          {sortBy === "timestamp" && (
              <div>
                {Methods.sortByTimestampOlderFirst(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}
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
