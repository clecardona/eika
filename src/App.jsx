import { useState } from "react";
import React from "react";

import logo from "./assets/images/logo.png";
import "./styles/App.scss";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer";

export default function App() {

 // STATES
 const [isNostalgic, setIsNostalgic] = useState(false);


// METHODS
 function toggleNostalgic(){
  setIsNostalgic(!isNostalgic)
 }

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" />
        <div className="filter">
        <p>Do you feel nostalgic ? </p>
        <div className="slider" >
           <input
          type="checkbox"
          /* checked={filter}*/
          onChange={toggleNostalgic} 
        />
        </div>
       
      </div>
      </header>
      <main>
        <ShoppingList />
      </main>
      <Footer />
    </div>
  );
}
