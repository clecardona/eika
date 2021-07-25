import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import links from "../assets/links.json";

export default function Footer() {
  console.log(links);
  

  function getIcon(stringIcon) {
    switch (stringIcon) {
      case "website":
        return faSafari;
      case "github":
        return faGithub;
      case "mail":
        return faEnvelope;
      case "linkedin":
        return faLinkedin;
      default:
        return;
    }
  }

  return (
    <footer>
      <div className="wrapper">
        <div>
          <p>Made with ♡ by</p>
          <p>
            <strong>
              <a href={links[0].url} target="blank">
                @clecardona
              </a>
            </strong>
          </p>
        </div>

        <ol>
          {links.map((item) => (
            <li key={item.id}>
              <a href={item.url} target="blank" className="icon">
                <FontAwesomeIcon
                  icon={getIcon(item.icon)}
                  className="icon "
                  size="2x"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </footer>
  );
}
