import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import links from "../assets/links.json";

export default function Welcome() {
  return (
    <div className="emptylist">

      <p className="description">
      <div className="hej" >Tere! </div><br/>
      (Welcome) to EIKA, the famous Estonian furniture store.<br/>

        In the Shopping-List App,  you will be able to add items you plan to buy in our 
        <strong> Kenasse </strong>  store. <br/>
        This App replace the old version made of a pen + a sheet.
        If you feel nostalgic, feel free to to toggle the button 
        on top of the page.<br/>
        <strong>Thank you for shopping with us ...</strong>
      </p>
      <p> Add your first item </p>
      <div className="arrowdown"></div>

    </div>
  );
}
