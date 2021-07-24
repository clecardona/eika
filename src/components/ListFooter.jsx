import React from "react";
import AppFunctions from "../services/AppFunctions";

export default function FooterList() {


  
  const totalPriceOwned = AppFunctions.getTotalPriceOfItems()[0];
  const totalPriceNotOwned = AppFunctions.getTotalPriceOfItems()[1];


  return (
    <div className="total">
      <p></p>
      <h3> Total </h3>
      <div className="total-label">
        <p className="total-owned">Owned</p>
        <p className="total-not-owned"> Not yet</p>
      </div>
      <div className="total-label">
        <p className="total-owned"> {totalPriceOwned} :-</p>
        <p className="total-not-owned"> {totalPriceNotOwned} :-</p>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
