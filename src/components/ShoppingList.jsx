import React, { useState, useEffect } from "react";

import Item from "./Item";
import ListHeader from "./ListHeader";
import AppFunctions from "../services/AppFunctions";
import useFetch from "../services/useFetch";
import { Spinner } from "@chakra-ui/react";
import ModalComponent from "./ModalComponent";
import { Button } from "@chakra-ui/react";

export default function ShoppingList() {
  // STATES
  const [filterResults, setFilterResults] = useState(
    AppFunctions.getFilterSelected()
  );
  const [sortBy, setSortBy] = useState(AppFunctions.getSortBySelected());
  const [reload, setReload] = useState(false);

  // HOOKS
  const { data, error, loading } = useFetch(reload);

  //FUNCTIONS
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

  function toggleFilter() {
    setFilterResults(!filterResults);
    AppFunctions.saveFilterSelected(!filterResults);
  }

  function handleClear() {
    localStorage.clear();
    window.location.reload();
  }

  if (loading) return <Spinner id="spinner" />;

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
                </div>

                <div className="btn-sort">
                  <button onClick={sortByTimestamp}>Reset</button>
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
                {AppFunctions.sortByPrice(
                  AppFunctions.getOnlyAcquiredItems(data)
                ).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList} />
                  </li>
                ))}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {AppFunctions.sortByName(
                  AppFunctions.getOnlyAcquiredItems(data)
                ).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList} />
                  </li>
                ))}
              </div>
            )}

            {sortBy === "timestamp" && (
              <div>
                {AppFunctions.sortByTimestampOlderFirst(
                  AppFunctions.getOnlyAcquiredItems(data)
                ).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList} />
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
                    <Item item={item} reloadShoppingList={reloadShoppingList} />
                  </li>
                ))}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {AppFunctions.sortByName(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList} />
                  </li>
                ))}
              </div>
            )}

            {sortBy === "timestamp" && (
              <div>
                {AppFunctions.sortByTimestampOlderFirst(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} reloadShoppingList={reloadShoppingList} />
                  </li>
                ))}
              </div>
            )}
          </div>
        )}
      </ol>

      <div className="buttons">

     


        <ModalComponent
          label={"Add item"}
          reloadShoppingList={reloadShoppingList}
          button={true}
          add={true}
        />

<ModalComponent
          label={"Edit item"}
          reloadShoppingList={reloadShoppingList}
          button={true}
          edit={true}
        />

        {data.length > 0 && (
          <Button
            variant="outline"
            colorScheme="red"
            mr={3}
            onClick={handleClear}
          >
            Clear List
          </Button>
        )}



      </div>
    </section>
  );
}
