export default function SortMenu({sortBy,sortByName,sortByPrice,filterResults,sortByTimestamp,toggleFilter}) {
  return (
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
            <input
              className="check-with-label"
              type="checkbox"
              id="reset"
              checked={false}
              onClick={sortByTimestamp}
            />
            <label className="label-for-check" htmlFor="reset">
              Reset
            </label>
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
  );
}
