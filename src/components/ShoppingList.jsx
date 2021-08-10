//External imports
import React, { useState } from "react";
import { CSSTransitionGroup } from "react-transition-group-v1";
import { Spinner } from "@chakra-ui/react";

// Local imports
import AppFunctions from "../services/AppFunctions";
import useFetch from "../services/useFetch";

import Item from "./Item";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";
import Welcome from "./Welcome";
import SortMenu from "./SortMenu";
import ButtonsMenu from "./ButtonsMenu";

export default function ShoppingList({ isNostalgic }) {
  // States
  const [filterResults, setFilterResults] = useState(
    AppFunctions.getFilterSelected()
  );
  const [sortBy, setSortBy] = useState(AppFunctions.getSortBySelected());
  const [reload, setReload] = useState(false);

  // Hooks
  const { data, error, loading, setData } = useFetch(reload);

  // Sorting/filtering logic
  let items = AppFunctions.sortByTimestampOlderFirst(data);

  if (filterResults) {
    if (sortBy === "price") {
      items = AppFunctions.getNotAcquiredItems(AppFunctions.sortByPrice(data));
    } else if (sortBy === "name") {
      items = AppFunctions.getNotAcquiredItems(AppFunctions.sortByName(data));
    } else {
      items = AppFunctions.getNotAcquiredItems(
        AppFunctions.sortByTimestampOlderFirst(data)
      );
    }
  } else {
    if (sortBy === "price") {
      items = AppFunctions.sortByPrice(data);
    } else if (sortBy === "name") {
      items = AppFunctions.sortByName(data);
    }
  }

  //Functions
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
      <section className="shopping_list">
        {data.length === 0 ? (
          <Welcome isNostalgic={isNostalgic} />
        ) : (
          <>
            <h1 className="title">My Shopping-List</h1>
            <SortMenu
              sortBy={sortBy}
              sortByName={sortByName}
              sortByPrice={sortByPrice}
              sortByTimestamp={sortByTimestamp}
              filterResults={filterResults}
              toggleFilter={toggleFilter}
            />
            <div className="list-container">
              <ListHeader />

              <ol>
                {!isNostalgic ? (
                  <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={400}
                  >
                    {items.map((item) => (
                      <li key={item.id}>
                        <Item
                          item={item}
                          reloadShoppingList={reloadShoppingList}
                          deleteItem={deleteItem}
                        />
                      </li>
                    ))}
                  </CSSTransitionGroup>
                ) : (
                  <>
                    {items.map((item) => (
                      <li key={item.id}>
                        <Item
                          item={item}
                          reloadShoppingList={reloadShoppingList}
                          deleteItem={deleteItem}
                        />
                      </li>
                    ))}
                  </>
                )}
              </ol>

              {(filterResults &&
                AppFunctions.getNotAcquiredItems(data).length) === 0 && (
                <span className="legend-middle">
                  <p> No items found</p>
                </span>
              )}

              {data.length > 0 && <ListFooter />}
            </div>
          </>
        )}
        <ButtonsMenu
          reloadShoppingList={reloadShoppingList}
          handleClear={handleClear}
          length={data.length}
        />
      </section>
    </>
  );
}
