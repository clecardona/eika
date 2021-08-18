//Local imports
import logo from "../assets/images/logo.png";

export default function Header({ isNostalgic, toggleNostalgic }) {
  return (
    // header and wrapper can be a single tag to avoid over nesting.
    <header className="header">
      <div className="wrapper">
        <a href={window.location.href}>
          <img src={logo} alt="logo" />
        </a>
        <div className="style-banner">
          <p>Nostalgic ? </p>
          <div className="slider">
            <input
              type="checkbox"
              checked={isNostalgic}
              onChange={toggleNostalgic}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
