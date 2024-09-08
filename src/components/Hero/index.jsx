import { Link, useLocation } from "react-router-dom";
import Background from "../../assets/background.png";
import "./styles.css";

const Hero = ({ characterName }) => {
  const location = useLocation();
  const { pathname } = location;

  const isCharacters = pathname === "/characters";
  const isComics = pathname === "/comics";

  return (
    <div className="hero">
      <img src={Background} alt="Marvel Heroes" className="hero-image" />

      <div className="hero-buttons">
        <Link to="/characters">
          <button
            className={`hero-button ${isCharacters && "active"}`}
            disabled={isCharacters}
          >
            Characters
          </button>
        </Link>
        <Link to="/comics">
          <button
            className={`hero-button ${isComics && "active"}`}
            disabled={isComics}
          >
            Comics
          </button>
        </Link>
      </div>

      {characterName && (
        <div className="hero-title">Comics with {characterName}</div>
      )}
    </div>
  );
};

export default Hero;
