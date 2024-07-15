import React from "react";
import { Link } from "react-router-dom";
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
  return (
    <Link
      to={`/character/${character.id}`}
      className="character-card"
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="character-card__image"
      />
      <h2 className="character-card__name">{character.name}</h2>
    </Link>
  );
};

export default CharacterCard;
