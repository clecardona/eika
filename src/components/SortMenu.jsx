//External imports
import { Eye, EyeSlash } from "react-bootstrap-icons";

// if you need to pass tha many arguments is a clear sign that some or all functionality should be written here.
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
              <div className="wrapper">
                {!filterResults ? (
                  <>
                    <Eye className="btn btn-sm icon" />
                    <p>Show </p>
                  </>
                ) : (
                  <>
                    <EyeSlash className="btn btn-sm icon" />
                    <p>Hide </p>
                  </>
                )}
                <p>owned products </p>
              </div>
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
