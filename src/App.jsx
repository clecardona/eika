import {RecoilRoot} from "recoil";

import logo from "./assets/images/logo.png";
import "./styles/App.scss";
import ShoppingList from "./components/ShoppingList";


export default  function App() {


  return (
    <RecoilRoot>
    <div className="App">
      
      {/* <header className="header">header<img src={logo} alt="logo" /></header> */}
      <main><ShoppingList/></main>
      {/* <footer>footer</footer> */}
    </div>
    </RecoilRoot>
  );
}


