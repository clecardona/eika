//External imports // good naming, but use "NPM Packages" as the name
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
  // Here, to make the code easy to read, if your hook uses external data (AppFunctions.getStyleSelected)
  // make a constant right on top of the hook (const selectedStyle = AppFunctions.getStyleSelected) and then just
  // pass the selectedStyle to the hoook to make 1 line instead of 3.
  const [isNostalgic, setIsNostalgic] = useState(
    AppFunctions.getStyleSelected()
  );

  // Functions
  function toggleNostalgic() {
    // Here there is 2 states handling the same data. Use derived states instead -1
    AppFunctions.saveStyleSelected(!isNostalgic);
    setIsNostalgic(!isNostalgic);
  }

  // Real clean JSX congrats.
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
