import { useState } from "react";
import React from "react";

import logo from "./assets/images/logo.png";
import "./styles/App.scss";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer";
import Methods from "./services/Methods";

export default function App() {
  // STATES
  const [isNostalgic, setIsNostalgic] = useState(Methods.getStyleSelected());
  
  // METHODS
  function toggleNostalgic() {
    Methods.saveStyleSelected(!isNostalgic)
    setIsNostalgic(!isNostalgic)
    //console.log(isNostalgic)
  }
//console.log(isNostalgic)
  return (
    <div className={"App" + (isNostalgic ? " App-nostalgic" : "")}>
      <header className="header">
        <img src={logo} alt="logo" />
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
        <section className="bloc">
          <img
            className="img-main"
            src={isNostalgic ?
              "https://clecardona.com/summer_camp/eika/ikea_mala.png"
             : "https://clecardona.com/summer_camp/eika/list.png"
              }
            alt="img-main"
          />
          <h1 id="title">My Shopping-List</h1>
        </section>

        <ShoppingList />
      </main>
      <Footer />
    </div>
  );
}
