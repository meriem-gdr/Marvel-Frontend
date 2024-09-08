import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios";

import "./styles.css";
import { Link } from "react-router-dom";

const Card = ({
  token,
  id,
  type, // character or comic
  image,
  name,
  description,
  isFavorite,
  updateFavorite,
}) => {
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const characterId = type === "character" ? id : null;
  const comicId = type === "comic" ? id : null;

  const setFavorite = async () => {
    if (!token) {
      alert("You must be logged in to set a favorite.");
      return;
    }

    try {
      setIsFavoriteLoading(true);
      const response = await axios.post(
        `https://site--marvel-backend--x8bwsvjswy7s.code.run/favorites/${type}`,
        {
          characterId,
          comicId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("response", response);

      updateFavorite({
        id: response.data.id,
        isFavorite: response.data.isFavorite,
      });

      setIsFavoriteLoading(false);
    } catch (error) {
      console.error("Failed to set favorite:", error);
    }
  };
  return (
    <div className="card">
      <img src={image} alt={`${name} image`} className="card-image" />

      <div className="card-content">
        <div className="card-header">
          <h2 className="card-name">{name}</h2>
          <button
            className={`icon-button ${isFavoriteLoading ? "loading" : ""}`}
            disabled={isFavoriteLoading}
            onClick={setFavorite}
          >
            {isFavorite ? (
              <FaHeart className="heart-icon" />
            ) : (
              <FaRegHeart className="heart-icon" />
            )}
          </button>
        </div>

        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer">
        {characterId && (
          <Link to={`/comics/${id}`}>
            <button className="button-secondary">Voir les comics</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
