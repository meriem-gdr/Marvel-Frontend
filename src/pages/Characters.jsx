import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Grid from "../components/Grid";
import Card from "../components/Card";
import LoadMore from "../components/LoadMore";
import Loading from "../components/Loading";

const Characters = ({ token, setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { count, results } = data;
  const characters = results || [];
  const hasNextPage = count > characters.length;

  console.log("data", data);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://site--marvel-backend--x8bwsvjswy7s.code.run/characters`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            params: { name: search, page },
          }
        );

        setData(
          page === 1
            ? response.data
            : {
                ...response.data,
                results: [...data.results, ...response.data.results],
              }
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    };

    fetchCharacters();
  }, [search, page]);

  const handleSearchChange = (e) => {
    if (page !== 1) {
      setPage(1);
    }
    setSearch(e.target.value);
  };

  const updateFavorite = ({ id, isFavorite }) => {
    setData((prevData) => ({
      ...prevData,
      results: prevData.results.map((character) =>
        character._id === id
          ? { ...character, isFavorite: isFavorite }
          : character
      ),
    }));
  };

  return (
    <>
      <Header
        isAuthenticated={Boolean(token)}
        logout={() => setUser()}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <Hero />

      <Grid>
        {characters.map((character) => {
          return (
            <Card
              key={character._id}
              token={token}
              id={character._id}
              type="character"
              image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              name={character.name}
              description={character.description}
              isFavorite={character.isFavorite}
              updateFavorite={updateFavorite}
            />
          );
        })}
      </Grid>

      <Loading isLoading={isLoading} />

      <LoadMore
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        onClick={() => setPage((prevPage) => prevPage + 1)}
      />
    </>
  );
};

export default Characters;
