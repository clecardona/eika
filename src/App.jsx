import { useState } from "react";
import React from "react";

import logo from "./assets/images/logo.png";
import "./styles/App.scss";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer";
import AppFunctions from "./services/AppFunctions";


export default function App() {
  // STATES
  const [isNostalgic, setIsNostalgic] = useState(AppFunctions.getStyleSelected());
  
  
  // FUNCTIONS
  
  function toggleNostalgic() {
    AppFunctions.saveStyleSelected(!isNostalgic)
    setIsNostalgic(!isNostalgic)
 
  }

  return (
    <div className={"App" + (isNostalgic ? " App-nostalgic" : "")}>
      <header className="header">
        <a href={window.location.href}>
        <img src={logo} alt="logo" />

        </a>
        <div className="style-banner">
          <p>Do you feel nostalgic ? </p>
          <div className="slider">
            <input
              type="checkbox"
              checked={isNostalgic} 
              onChange={toggleNostalgic}
            />
          </div>
        </div>
      </header>
      <main>
        <ShoppingList isNostalgic={isNostalgic}/>
      </main>
      <Footer />
    </div>
  );
}
