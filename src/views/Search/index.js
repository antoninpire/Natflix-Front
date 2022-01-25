import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../components/Loader";
import { requests } from "../../requests";
import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";
import { Poster } from "../../components/Poster";
import Grid from "@mui/material/Grid";
import { ListsModal } from "../../components/ListsModal";

export function Search({ history }) {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryType, setQueryType] = useState("Any");
  const [queryValue, setQueryValue] = useState("");
  const [open, setOpen] = useState(false);
  const [movieBeingAdded, setMovieBeingAdded] = useState({ id: 9999 });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(requests.fetchAllMovies);
      setMovies(request.data);
      const r = params.query.substring(1).split("]");
      // const type = r[0];
      // const val = r[1];
      setQueryType(r[0]);
      setQueryValue(r[1]);
      /* const arr = request.data.filter((movie) => {
        if (type === "Genre") {
          return movie.nom_genres && movie.nom_genres.split(",").includes(val);
        } else {
          if (movie.titre.replaceAll("\\", "").includes("Don't Look Up")) {
            console.log("val", val);
            console.log(movie.titre.replaceAll("/", "").toLowerCase());
            console.log(
              movie.titre.replaceAll("\\", "").toLowerCase().includes(val)
            );
          }
          return (
            movie.titre.replaceAll("/", "").toLowerCase().includes(val) ||
            (movie.nom_genres && movie.nom_genres.split(",").includes(val)) ||
            (movie.nom_producteurs &&
              movie.nom_producteurs.split(",").includes(val))
          );
        }
      });
      console.log(arr); */
      setLoading(false);
    }
    fetchData();
  }, [params]);

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
        <h2>
          Résultats pour "
          {queryType === "Genre" ? `Genre: ${queryValue}` : queryValue}"
        </h2>
        <Grid container justifyContent="center" spacing={1}>
          {movies
            .filter((movie) => {
              if (queryType === "Genre") {
                return (
                  queryValue &&
                  movie.nom_genres &&
                  movie.nom_genres
                    .split(",")
                    .some(
                      (g) =>
                        g &&
                        g
                          .replaceAll("\\", "")
                          .toLowerCase()
                          .includes(queryValue.toLowerCase())
                    )
                );
              } else {
                return (
                  (movie.titre &&
                    movie.titre
                      .replaceAll("\\", "")
                      .toLowerCase()
                      .includes(queryValue.toLowerCase())) ||
                  (queryValue &&
                    movie.nom_genres &&
                    movie.nom_genres
                      .split(",")
                      .some(
                        (g) =>
                          g &&
                          g
                            .replaceAll("\\", "")
                            .toLowerCase()
                            .includes(queryValue.toLowerCase())
                      )) ||
                  (queryValue &&
                    movie.nom_producteurs &&
                    movie.nom_producteurs
                      .split(",")
                      .some(
                        (g) =>
                          g &&
                          g
                            .replaceAll("\\", "")
                            .toLowerCase()
                            .includes(queryValue.toLowerCase())
                      ))
                );
              }
            })
            .map((film) => (
              <Grid key={film.id} item>
                <Poster movie={film} isLarge addToLists={addToLists} />
              </Grid>
            ))}
        </Grid>
      </div>
      <ListsModal movie={movieBeingAdded} open={open} setOpen={setOpen} />
    </div>
  );
}
