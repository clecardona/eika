import React, { useState, useEffect } from "react";

import Item from "./Item";
import AppFunctions from "../services/AppFunctions";
import useFetch from "../services/useFetch";
import { Spinner } from "@chakra-ui/react";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";
import Welcome from "./Welcome";
import SortMenu from "./SortMenu";
import ButtonsMenu from "./ButtonsMenu";

export default function ShoppingList({ isNostalgic, reloadApp }) {
  // STATES
  const [filterResults, setFilterResults] = useState(
    AppFunctions.getFilterSelected()
  );
  const [sortBy, setSortBy] = useState(AppFunctions.getSortBySelected());
  const [reload, setReload] = useState(false);

  // HOOKS
  const { data, error, loading, setData } = useFetch(reload);

  let items = AppFunctions.sortByTimestampOlderFirst(data);

  if (filterResults) {
    items = AppFunctions.getOnlyAcquiredItems(data);
    if (sortBy === "price") {
      items = AppFunctions.getOnlyAcquiredItems(AppFunctions.sortByPrice(data));
    } else if (sortBy === "name") {
      items = AppFunctions.getOnlyAcquiredItems(AppFunctions.sortByName(data));
    } else {
      //do nothing
    }
  } else {
    if (sortBy === "price") {
      items = AppFunctions.sortByPrice(data);
    } else if (sortBy === "name") {
      items = AppFunctions.sortByName(data);
    } else {
      //do nothing
    }
  }

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
    setData([]);
    localStorage.clear();
  }

  function deleteItem(otherProducts) {
    AppFunctions.saveListToLocalSorage(otherProducts);
    reloadShoppingList();
  }

  if (loading) return <Spinner id="spinner" />;

  return (
    <>
      <section className="bloc">
        {data.length === 0 && (
          <img
            className="img-main"
            src={
              isNostalgic
                ? ""
                : "https://clecardona.com/summer_camp/eika/list.png"
            }
            alt="img-main"
          />
        )}
        <h1 id="title">My Shopping-List</h1>
      </section>

      <section className="shopping_list">
        {data.length === 0 ? (
          <Welcome />
        ) : (
          <>
            <SortMenu
              sortBy={sortBy}
              sortByName={sortByName}
              sortByPrice={sortByPrice}
              sortByTimestamp={sortByTimestamp}
              filterResults={filterResults}
              toggleFilter={toggleFilter}
            />
            <ListHeader />
          </>
        )}
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <Item
                item={item}
                reloadShoppingList={reloadShoppingList}
                deleteItem={deleteItem}
              />
            </li>
          ))}
        </ol>

        {(filterResults && AppFunctions.getOnlyAcquiredItems(data).length) ===
          0 && (
          <span className="legend-middle">
            <p> No items found</p>
          </span>
        )}

        {data.length > 0 && <ListFooter />}

        <ButtonsMenu
          reloadShoppingList={reloadShoppingList}
          handleClear={handleClear}
          length={data.length}
        />
      </section>
    </>
  );
}
