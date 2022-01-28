import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../components/Loader";
import { requests } from "../../requests";
import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";
import { Poster } from "../../components/Poster";
import Grid from "@mui/material/Grid";
import { ListsModal } from "../../components/ListsModal";
import { constants } from "../../constants";

export function Recommendations() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [movieBeingAdded, setMovieBeingAdded] = useState({ id: 9999 });
  const [isLarge, setIsLarge] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      setIsLarge(localStorage.getItem(constants.displaySettingStorageKey) == 1);

      const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
      const user = JSON.parse(userStorage);
      const request = await axios.get(
        `${requests.fetchRecommandations}?filtering=${
          localStorage.getItem(constants.recommandationSettingStorageKey) || 1
        }&id_user=${user.id}`
      );

      setMovies(request.data);

      setLoading(false);
    }
    fetchData();
  }, []);

  const addToLists = (movie) => {
    setOpen(true);
    setMovieBeingAdded(movie);
  };

  if (loading) return <Loader />;

  return (
    <div className="search-container">
      <Helmet>
        <title>Résultats</title>
      </Helmet>
      <NavBar />
      <div className="search-content">
        <h2>Recommandations</h2>
        <Grid container justifyContent="center" spacing={1}>
          {movies.map((film) => (
            <Grid key={film.id} item>
              <Poster movie={film} isLarge={isLarge} addToLists={addToLists} />
            </Grid>
          ))}
        </Grid>
      </div>
      <ListsModal movie={movieBeingAdded} open={open} setOpen={setOpen} />
    </div>
  );
}
