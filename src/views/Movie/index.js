import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";
import { useRouteMatch } from "react-router-dom";
import { requests } from "../../requests";
import axios from "axios";
import { Loader } from "../../components/Loader";
import { MoviePoster } from "./MoviePoster";
import Grid from "@mui/material/Grid";
import { MovieInfos } from "./MovieInfos";
import { Poster } from "../../components/Poster";

export function Movie() {
  const route = useRouteMatch();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [hasWatched, setHasWatched] = useState(false);
  const [note, setNote] = useState(null);
  const [lists, setLists] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  if (Object.keys(movie).length && route.params.id != movie.id)
    window.location.reload();

  useEffect(() => {
    const movieId = route.params.id;
    async function fetchData() {
      setLoading(true);
      const userStorage = localStorage.getItem("user");
      const user = JSON.parse(userStorage);
      let request;
      request = await axios.get(requests.fetchMovie + movieId);
      setMovie(request.data[0]);
      request = await axios.get(
        `${requests.fecthViewFilmAndUser}?id_film=${movieId}&id_utilisateur=${user.id}`
      );
      setHasWatched(request.data.length ? true : false);
      request = await axios.get(
        `${requests.fetchNoteFilmAndUser}?id_film=${movieId}&id_utilisateur=${user.id}`
      );
      setNote(request.data.length ? request.data[0].note : null);
      request = await axios.get(requests.fetchListsWithoutMovies + user.id);
      setLists(request.data);
      request = await axios.get(requests.fetchSimilarMovies + movieId);
      setSimilarMovies(request.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="movie-container">
      <Helmet>
        <title>{movie.titre}</title>
      </Helmet>
      <NavBar />
      <div className="movie-content">
        <Grid container justifyContent="flex-start" spacing={0}>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              paddingRight: "2rem",
              flexDirection: "column",
              paddingLeft: 200,
            }}
          >
            <MoviePoster
              movie={movie}
              hasWatched={hasWatched}
              note={note}
              lists={lists}
            />
          </Grid>
          <Grid item xs={12} md={8} style={{ paddingTop: "1rem" }}>
            <MovieInfos movie={movie} />
          </Grid>
        </Grid>
      </div>
      <div className="movie-similar">
        <h2>Films similaires ({similarMovies.length})</h2>
        <Grid container justifyContent="flex-start" spacing={1}>
          {similarMovies.map((film) => (
            <Grid key={film.id} item>
              <Poster movie={film} isLarge width="auto" />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
