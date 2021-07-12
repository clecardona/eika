import { useState } from "react";
import React from "react";

import Item from "./Item";
import Overlay from "./Overlay";

export default function ShoppingList() {

  // CONSTANTS
  let previousList = JSON.parse(localStorage.getItem("list"));
  if (previousList == null) {
    previousList = [];
  }

  const sortedList = previousList.sort((a, b) => a.timestamp - b.timestamp);

  const filteredList = sortedList.filter(function (i) {
    return i.acquired === true;
  });

  const [list, setList] = useState(sortedList);
  const [filter, setFilter] = useState(false);

  //console.log("filter", filter);
  //console.log("sorted",sortedList)
  //console.log("filtered",filteredList)

  function toggleFilter() {
    setFilter(!filter);
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

      <span className="legend">
        <div></div>
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
      </span>

      <div className="hr"></div>

      <ol>
        {filter ? (
          <div>
            {filteredList.map((item) => (
              <li key={item.id}>
                <Item item={item} list={list} />
              </li>
            ))}
          </div>
        ) : (
          <div>
            {sortedList.map((item) => (
              <li key={item.id}>
                <Item item={item} list={list} />
              </li>
            ))}
          </div>
        )}
      </ol>

      <div className="filter">
        <p>Show only acquired products</p>
        <input
          className="slider"
          type="checkbox"
          checked={filter}
          onChange={toggleFilter}
        />
      </div>

      <div className="buttons">
        <Overlay list={list} type={"addItem"} />
        <button className="btn btn-oval btn-clear" onClick={handleClear}>
          CLEAR ALL ITEMS
        </button>
      </div>
    </section>
  );
}
