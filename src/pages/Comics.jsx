import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Grid from "../components/Grid";
import Card from "../components/Card";
import LoadMore from "../components/LoadMore";
import Loading from "../components/Loading";

const Comics = ({ token, setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { count, results } = data;
  const comics = results || [];
  const hasNextPage = count > comics.length;

  console.log("data", data);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://site--marvel-backend--x8bwsvjswy7s.code.run/comics`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            params: { title: search, page },
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
        console.error("Failed to fetch comics:", error);
      }
    };

    fetchComics();
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
      results: prevData.results.map((comic) =>
        comic._id === id ? { ...comic, isFavorite: isFavorite } : comic
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
        {comics.map((comic) => {
          return (
            <Card
              key={comic._id}
              id={comic._id}
              token={token}
              type="comic"
              image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              name={comic.title}
              description={comic.description}
              isFavorite={comic.isFavorite}
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

export default Comics;
