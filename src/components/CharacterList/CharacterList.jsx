import React, { useState, useEffect } from "react";
import { fetchCharacters } from "../../api/api";
import CharacterCard from "../CharacterCard/CharacterCard";
import Loader from "../Loader/Loader";
import "./CharacterList.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const LIMIT = 15;

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters(
          search,
          page * LIMIT,
          LIMIT
        );
        setCharacters(data.results);
        setTotal(data.total);
        setError("");
      } catch (error) {
        setError(
          "Failed to fetch characters. Please try again later."
        );
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [search, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const nextPage = () => {
    if ((page + 1) * LIMIT < total) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <main className="main">
      <input
        type="text"
        placeholder="Search characters"
        value={search}
        onChange={handleSearchChange}
        className="character-list__search-input"
      />
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <div className="character-list__card-grid">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
      <div className="character-list__pagination">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="character-list__pagination-button"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={(page + 1) * LIMIT >= total}
          className="character-list__pagination-button"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default CharacterList;
