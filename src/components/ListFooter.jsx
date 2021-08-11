//Local Imports
import AppFunctions from "../services/AppFunctions";

export default function ListFooter({ showOwned }) {
  //States
  const totalPriceNotOwned = AppFunctions.getTotalPriceOfItems()[0];
  const totalPriceOwned = AppFunctions.getTotalPriceOfItems()[1];

  return (
    <div className="total">
      <p></p>
      <h3> Total </h3>
      <div className="total-label">
        <p className="total-not-owned"> Not owned</p>
        {showOwned && <p className="total-owned">Owned</p>}
      </div>
      <div className="total-label">
        <p className="total-not-owned"> {totalPriceNotOwned}:-</p>
        {showOwned && <p className="total-owned"> {totalPriceOwned}:-</p>}
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
