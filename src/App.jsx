import { useState } from "react";
import React from "react";

import "./styles/App.scss";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer";
import AppFunctions from "./services/AppFunctions";
import Header from "./components/Header";

//localStorage.clear()

export default function App() {
  // STATES
  const [isNostalgic, setIsNostalgic] = useState(
    AppFunctions.getStyleSelected()
  );
  const [reload, setReload] = useState(false);

  // FUNCTIONS

  function toggleNostalgic() {
    AppFunctions.saveStyleSelected(!isNostalgic);
    setIsNostalgic(!isNostalgic);
  }

  function reloadApp() {
    setReload(!reload);
  }

  return (
    <div className={"App" + (isNostalgic ? " App-nostalgic" : "")}>
      <Header isNostalgic={isNostalgic} toggleNostalgic={toggleNostalgic} />
      <main>
        <ShoppingList isNostalgic={isNostalgic} reloadApp={reloadApp} />
      </main>
      <Footer />
    </div>
  );
}
