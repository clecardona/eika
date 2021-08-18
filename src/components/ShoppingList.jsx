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
  const [showOwned, setShowOwned] = useState(AppFunctions.getFilterSelected());
  const [sortBy, setSortBy] = useState(AppFunctions.getSortBySelected());
  const [reload, setReload] = useState(false);

  // Hooks
  const { data, error, loading, setData } = useFetch(reload);

  // Sorting/filtering logic
  let items = AppFunctions.sortByTimestampOlderFirst(data);

  if (sortBy === "price") {
    items = AppFunctions.sortByPrice(items);
  } else if (sortBy === "name") {
    items = AppFunctions.sortByName(items);
  } else {
    items = AppFunctions.sortByTimestampOlderFirst(items);
  }

  const ownedItems = AppFunctions.getOnlyAcquiredItems(items);
  const notOwnedItems = AppFunctions.getNotAcquiredItems(items);

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
    setShowOwned(!showOwned);
    AppFunctions.saveFilterSelected(!showOwned);
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

    // Same as other JSX comments
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
              filterResults={showOwned}
              toggleFilter={toggleFilter}
            />
            <div className="list-container">
              <ListHeader />

              <ol>
                <CSSTransitionGroup
                  transitionName= {!isNostalgic ? "fade" : "nfade"}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={10}
                  transitionAppear={true}
                  transitionAppearTimeout={400}
                >
                  {notOwnedItems.map((item) => (
                    <li key={item.id}>
                      <Item
                        item={item}
                        reloadShoppingList={reloadShoppingList}
                        deleteItem={deleteItem}
                      />
                    </li>
                  ))}
                  {showOwned && (
                    <div className="owned">
                      {ownedItems.map((item) => (
                        <li key={item.id}>
                          <Item
                            item={item}
                            reloadShoppingList={reloadShoppingList}
                            deleteItem={deleteItem}
                          />
                        </li>
                      ))}
                    </div>
                  )}
                </CSSTransitionGroup>
              </ol>

              {(!showOwned && AppFunctions.getNotAcquiredItems(data).length) ===
                0 && (
                <span className="legend-middle">
                  <p> No items found</p>
                </span>
              )}

              {data.length > 0 && <ListFooter showOwned={showOwned} />}
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
