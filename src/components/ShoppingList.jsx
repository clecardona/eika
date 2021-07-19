import React ,{ useState, useEffect } from "react";


import Item from "./Item";
import Overlay from "./Overlay";
import ListHeader from "./ListHeader";
import AppFunctions from "../services/AppFunctions";

export default function ShoppingList() {
  // CONSTANTS

  // STATES
  const [filterResults, setFilterResults] = useState(
    AppFunctions.getFilterSelected()
  );
  const [data, setData] = useState(AppFunctions.getSavedListInLocalStorage());
  const [reload, setReload] = useState(false);
  //sorting states
  const [sortBy, setSortBy] = useState(AppFunctions.getSortBySelected());

useEffect(() => {
  setData(AppFunctions.getSavedListInLocalStorage())
}, [reload])

  function reloadShoppingList() {
    setReload(!reload);
  }

  function sortByName() {
    setSortBy("name");
    AppFunctions.saveSortBySelected("name");
  }

  function sortByPrice() {
    setSortBy("price");
    AppFunctions.saveSortBySelected("price");
  }

  function sortByTimestamp() {
    setSortBy("timestamp");
    AppFunctions.saveSortBySelected("timestamp");
  }

  console.log(sortBy);

  function toggleFilter() {
    setFilterResults(!filterResults);
    AppFunctions.saveFilterSelected(!filterResults);
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
            <p className="sort-label">Sort by</p>
              <div className="box-sort">

              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="name"
                  checked={sortBy === "name"}
                  onClick={sortByName}
                />
                <label className="label-for-check" htmlFor="name">
                  A→Z
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
                  Price 
                </label>
              </div >

              <div className="btn-sort">
              <button onClick={sortByTimestamp}>  
                Reset
              </button>
              </div>
            </div>
              </div>
              
            <div className="filter">
            
              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="acquired"
                  checked={filterResults}
                  onClick={toggleFilter}
                />

                <label className="label-for-check" htmlFor="acquired">
                  Owned 
                </label>
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
                {AppFunctions.sortByPrice(AppFunctions.getOnlyAcquiredItems(data)).map(
                  (item) => (
                    <li key={item.id}>
                      <Item item={item} reloadShoppingList={reloadShoppingList}/>
                    </li>
                  )
                )}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {AppFunctions.sortByName(AppFunctions.getOnlyAcquiredItems(data)).map(
                  (item) => (
                    <li key={item.id}>
                      <Item item={item} reloadShoppingList={reloadShoppingList}/>
                    </li>
                  )
                )}
              </div>
            )}

            {sortBy === "timestamp" && (
              <div>
                {AppFunctions.sortByTimestampOlderFirst(
                  AppFunctions.getOnlyAcquiredItems(data)
                ).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList}/>
                  </li>
                ))}
              </div>
            )}

            {AppFunctions.getOnlyAcquiredItems(data).length === 0 && (
              <span className="legend-middle">
                <p> No items found</p>
              </span>
            )}
          </div>
        ) : (
          <div>
            {sortBy === "price" && (
              <div>
                {AppFunctions.sortByPrice(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList}/>
                  </li>
                ))}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {AppFunctions.sortByName(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList}/>
                  </li>
                ))}
              </div>
            )}

          {sortBy === "timestamp" && (
              <div>
                {AppFunctions.sortByTimestampOlderFirst(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList}/>
                  </li>
                ))}
              </div>
            )}
          </div>
        )}
      </ol>


      <div className="buttons">
        <Overlay type={"addItem"} reloadShoppingList={reloadShoppingList}/>
        <button className="btn btn-oval btn-clear" onClick={handleClear}>
          REMOVE ALL ITEMS
        </button>
      </div>
    </section>
  );
}
