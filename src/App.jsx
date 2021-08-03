//External imports
import { useState } from "react";
import React from "react";

//Local imports
import "./styles/App.scss";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer";
import AppFunctions from "./services/AppFunctions";
import Header from "./components/Header";

export default function App() {
  // States
  const [isNostalgic, setIsNostalgic] = useState(
    AppFunctions.getStyleSelected()
  );

  // Functions
  function toggleNostalgic() {
    AppFunctions.saveStyleSelected(!isNostalgic);
    setIsNostalgic(!isNostalgic);
  }

  return (
    <div className={"App" + (isNostalgic ? " App-nostalgic" : "")}>
      <Header isNostalgic={isNostalgic} toggleNostalgic={toggleNostalgic} />
      <main>
        <ShoppingList isNostalgic={isNostalgic} />
      </main>
      <Footer />
    </div>
  );
}
