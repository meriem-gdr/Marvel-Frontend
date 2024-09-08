import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Loading from "../components/Loading";

const ComicsByCharacter = ({ token, setUser }) => {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const comics = data.comics || [];
  const characterName = data.name;

  console.log("data", data);

  useEffect(() => {
    const fetchComicsByCharacter = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--x8bwsvjswy7s.code.run/comics/${characterId}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.response?.data?.message || "An error occurred");
      }
    };

    fetchComicsByCharacter();
  }, []);

  const updateFavorite = ({ id, isFavorite }) => {
    setData((prevData) => ({
      ...prevData,
      comics: prevData.comics.map((comic) =>
        comic._id === id ? { ...comic, isFavorite: isFavorite } : comic
      ),
    }));
  };

  return (
    <>
      <Header isAuthenticated={Boolean(token)} logout={() => setUser()} />
      <Hero characterName={characterName} />
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
    </>
  );
};

export default ComicsByCharacter;
