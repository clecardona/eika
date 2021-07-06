import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner ,faBinoculars,faToolbox,faFolder} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import { slide as Menu } from "react-burger-menu";
import CC from '../assets/img/CC.png'

export default function Sidebar() {
  return (
    <Menu>
      <h3 id="menu-title">Menu</h3>
      <hr/>

      <div className="menu-item">
      <FontAwesomeIcon icon={faSpinner} className="icon-menu" size="1x" />

        <a  className="menu-item-text" href="#what">
          What I do ?
        </a>
      </div>

      <div className="menu-item">
      <FontAwesomeIcon icon={faBinoculars} className="icon-menu"  size="1x" />
       <a  className="menu-item-text" href="#who">
          Who I am ?
        </a>
      </div>

      <div className="menu-item">
      <FontAwesomeIcon icon={faFolder} className="icon-menu"  size="1x" />
        <a  className="menu-item-text" href="#selected">
          Selected Work
        </a>
      </div>

      <div className="menu-item">
      <FontAwesomeIcon icon={faToolbox} className="icon-menu"  size="1x" />
        <a  className="menu-item-text" href="#techno">Technologies handled
        </a>
      </div>

      <div className="burger-footer">
        <img className="img-60 img-rd" src={CC}/>
      </div>
    </Menu>
  );
}
