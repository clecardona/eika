
import React, { useState} from "react";
import ModalComponent from "./ModalComponent";
import AppFunctions from "../services/AppFunctions";

export default function ItemName({item}) {
 
  return (
    <div className="data">

      <div className="wrapper" >

          <div className="notif">
          {item.quantity}
          </div>
          <p>
          <strong>{item.name}</strong> 
          </p>
      </div>
          
          
        </div>
  );
}
