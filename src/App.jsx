import { RecoilRoot } from "recoil";

import logo from "./assets/images/logo.png";
import "./styles/App.scss";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer";

export default function App() {

  //localStorage.setItem("truc","pomme")


  return (
    <div className="App">
      <header className="header">
        header
        <img src={logo} alt="logo" />
      </header>
      <main>
        <ShoppingList />
      </main>
      <Footer />
    </div>
  );
}
