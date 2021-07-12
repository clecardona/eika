import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessKing, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <p>Made with ♡ by <a href ="https://github.com/clecardona" target="blank" >@clecardona</a> </p>
      
      <ol>
      
        <li><a href="mailto: clecardona@gmail.com" target="blank"  className="icon">

          <FontAwesomeIcon icon={faEnvelope} className="icon icon-mail" size="2x" />
        </a>
        </li>

        <li>
        <a href ="https://github.com/clecardona" target="blank">
          <FontAwesomeIcon icon={faGithub} className="icon icon-github" size="2x" />
          </a>
        </li>
      </ol>
      
    </footer>
  );
}
