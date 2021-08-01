export default function SortMenu({
  sortBy,
  sortByName,
  sortByPrice,
  filterResults,
  sortByTimestamp,
  toggleFilter,
}) {
  return (
    <div className="filter-sort">
      <div className="wrapper-sort">
      <div className="filter">
        <div className="btn-sort">
          <input
            className="check-with-label"
            type="checkbox"
            id="acquired"
            checked={filterResults}
            onChange={toggleFilter}
          />

          <label className="label-for-check" htmlFor="acquired">
            Show only owned products
          </label>
        </div>
      </div>

      <div className="sort">
        <p className="sort-label">Sort by</p>
        <div className="box-sort">
          <div className="btn-sort">
            <input
              className="check-with-label"
              type="checkbox"
              id="name"
              checked={sortBy === "name"}
              onChange={sortByName}
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
              onChange={sortByPrice}
            />

            <label className="label-for-check" htmlFor="price">
              Price
            </label>
          </div>

          <div className="btn-sort btn-reset ">
            <input
              className="check-with-label"
              type="checkbox"
              id="reset"
              checked={false}
              onChange={sortByTimestamp}
            />
            <label className="label-for-check" htmlFor="reset">
              Reset
            </label>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
