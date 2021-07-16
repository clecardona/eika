import { useState, useEffect } from "react";
import React from "react";

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
  const [sortByPrice, setSortByPrice] = useState(
    Methods.getSortByPriceSelected()
  );
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

  function sortPrice() {
    setSortByPrice(!sortByPrice);
    Methods.saveSortByPriceSelected(!sortByPrice);
  }
  //console.log(sortByPrice)

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
                  /* checked ={filterByPrice} */
                  /* onClick={sortbyName} */
                />
                <label className="label-for-check" htmlFor="name">
                  Name
                </label>
              </div>

              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="price"
                  checked={sortByPrice}
                  onClick={sortPrice}
                />

                <label className="label-for-check" htmlFor="price">
                  Price
                </label>
              </div>
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
            {sortByPrice ? (
              <div>
                {Methods.sortByPrice(Methods.getOnlyAcquiredItems(data)).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            ) : (
              <div>
                {Methods.getOnlyAcquiredItems(data).map((item) => (
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
            {sortByPrice ?
            <div>
{Methods.sortByPrice(data).map((item) => (
              <li key={item.id}>
                <Item item={item} />
              </li>
            ))}
            </div>
            :
            
            <div>
              {Methods.sortByTimestampOlderFirst(data).map((item) => (
              <li key={item.id}>
                <Item item={item} />
              </li>
            ))}
            </div>
            }
            
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
