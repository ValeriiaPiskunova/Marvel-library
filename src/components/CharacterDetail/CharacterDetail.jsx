import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCharacterById } from "../../api/api";
import Loader from "../Loader/Loader";
import "./CharacterDetail.css";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
        setError("");
      } catch (error) {
        setError(
          "Failed to fetch character details. Please try again later."
        );
        console.error("Error fetching character details:", error);
      }
    };

    getCharacter();
  }, [id]);

  const handleHomeClick = () => {
    navigate("/Marvel-library");
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return !character ? (
    <Loader />
  ) : (
    <div className="character-detail">
      <button onClick={handleHomeClick} className="home-button">
        Home
      </button>
      <h2>{character.name}</h2>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <p>
        <strong>Bio:</strong>{" "}
        {character.description || "No biography available"}
      </p>
      <p>
        <strong>Universe:</strong> {character.comics.available} comics
      </p>
    </div>
  );
};

export default CharacterDetail;
