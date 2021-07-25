import React from "react";

export default function ItemName({ item }) {
  return (
    <div className="data">
      <div className="wrapper">
        <div className="notif">{item.quantity}</div>
        <p>
          <strong>{item.name}</strong>
        </p>
      </div>
    </div>
  );
}
