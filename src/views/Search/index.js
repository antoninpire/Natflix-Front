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
import { constants } from "../../constants";

export function Search() {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryType, setQueryType] = useState("Any");
  const [queryValue, setQueryValue] = useState("");
  const [open, setOpen] = useState(false);
  const [movieBeingAdded, setMovieBeingAdded] = useState({ id: 9999 });
  const [title, setTitle] = useState("");
  const [isLarge, setIsLarge] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      setIsLarge(localStorage.getItem(constants.displaySettingStorageKey) == 1);

      const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
      const user = JSON.parse(userStorage);
      let request;
      const r = params.query.substring(1).split("]");

      setQueryType(r[0]);
      setQueryValue(r[1]);

      switch (r[0]) {
        case "Popular":
          request = await axios.get(requests.fetchPopularMovies);
          setTitle(`Films populaires (${request.data.length})`);
          break;
        case "Watched":
          request = await axios.get(
            requests.fetchWatchedMovies + "/" + user.id
          );
          setTitle(`Films déjà vus (${request.data.length})`);
          break;
        case "Rated":
          request = await axios.get(requests.fetchRatedMovies + "/" + user.id);
          setTitle(`Films que vous avez notés (${request.data.length})`);
          break;
        case "Genre":
          request = await axios.get(
            requests.fetchFilmsGenre + "?genre=" + r[1]
          );
          setTitle(`Films du genre [${r[1]}]`);
          break;
        case "Producteur":
          request = await axios.get(
            requests.fetchFilmsProducteur + "?producteur=" + r[1]
          );
          console.log(request.data);
          setTitle(`Films du producteur [${r[1]}]`);
          break;
        default:
          request = await axios.get(requests.fetchAllMovies);
          setTitle(`Résultats pour "${r[1]}" (${request.data.length})`);
          break;
      }
      setMovies(request.data);
      setLoading(false);
    }
    fetchData();
  }, [params]);

  const addToLists = (movie) => {
    setOpen(true);
    setMovieBeingAdded(movie);
  };

  const filterByQuery = (movie) => {
    if (queryType !== "Any") return true;
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
  };

  if (loading) return <Loader />;

  return (
    <div className="search-container">
      <Helmet>
        <title>Résultats</title>
      </Helmet>
      <NavBar />
      <div className="search-content">
        <h2>{title}</h2>
        <Grid container justifyContent="center" spacing={1}>
          {movies.filter(filterByQuery).map((film) => (
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
