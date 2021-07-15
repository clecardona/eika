import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import links from "../assets/links.json";

export default function Footer() {
  return (
    <footer>
      <div>
        <p>Made with ♡ by</p>

        <p>
          <strong>
            <a href={links.github} target="blank">
              @clecardona
            </a>
          </strong>
        </p>
      </div>

      <ol>
        <li>
          <a href={links.mail} target="blank" className="icon">
            <FontAwesomeIcon icon={faEnvelope} className="icon " size="2x" />
          </a>
        </li>

        <li>
          <a href={links.github} target="blank">
            <FontAwesomeIcon icon={faGithub} className="icon " size="2x" />
          </a>
        </li>

        <li>
          <a href={links.linkedin} target="blank">
            <FontAwesomeIcon icon={faLinkedin} className="icon " size="2x" />
          </a>
        </li>

        <li>
          <a href={links.website} target="blank">
            <FontAwesomeIcon icon={faSafari} className="icon " size="2x" />
          </a>
        </li>
      </ol>
    </footer>
  );
}
