import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";
import { Loader } from "../../components/Loader";
import { Row } from "./Row";
import { requests } from "../../requests";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { ListsModal } from "../../components/ListsModal";

export function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [displayedGenres, setDisplayedGenres] = useState([]);
  const [displayedProducers, setDisplayedProducers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [movieBeingAdded, setMovieBeingAdded] = useState({ id: 9999 });

  const randomFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const addToLists = (movie) => {
    setOpen(true);
    setMovieBeingAdded(movie);
  };

  useEffect(
    () => {
      async function fetchData() {
        setLoading(true);
        const userStorage = localStorage.getItem("user");
        const user = JSON.parse(userStorage);
        let request;
        request = await axios.get(requests.fetchDistinctGenres);

        // Choix de genres aléatoires pour les afficher
        let arr = [];
        for (let i = 0; i < 3; i++) {
          const r = randomFromRange(0, request.data.length);
          arr.push(request.data[r].nom);
          request.data.splice(r, 1);
        }
        setDisplayedGenres(arr);

        // Choix de producteurs aléatoires pour les afficher
        request = await axios.get(requests.fetchDistinctProducteurs);
        arr = [];
        for (let i = 0; i < 2; i++) {
          const r = randomFromRange(0, request.data.length);
          arr.push(request.data[r].nom);
          request.data.splice(r, 1);
        }
        setDisplayedProducers(arr);

        request = await axios.get(requests.fetchAllMovies);
        setAllMovies(request.data);
        request = await axios.get(requests.fetchPopularMovies);
        setPopularMovies(request.data);
        request = await axios.get(requests.fetchWatchedMovies + "/" + user.id);
        setWatchedMovies(request.data);
        setLoading(false);
        return request;
      }
      fetchData();
    },
    /*[fetchUrl]*/ []
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-container">
      <Helmet>
        <title>Accueil</title>
      </Helmet>
      <NavBar />
      <Row
        title="Recommandations"
        movies={allMovies.slice(0, 30)}
        isLargeRow
        addToLists={addToLists}
      />
      <Row
        title="Populaire"
        movies={popularMovies}
        isLargeRow
        addToLists={addToLists}
      />
      <Row
        title="Revoir"
        movies={watchedMovies}
        isLargeRow
        addToLists={addToLists}
      />
      {displayedGenres.map((genre) => (
        <Row
          key={uuid()}
          title={genre}
          movies={allMovies
            .filter((movie) => {
              return movie.nom_genres.includes(genre); // Filtre des films appartenant au genre
            })
            .slice(0, 25)}
          isLargeRow
          addToLists={addToLists}
        />
      ))}
      {displayedProducers.map((producteur) => (
        <Row
          key={uuid()}
          title={`Produit par ${producteur}`}
          movies={allMovies
            .filter((movie) => {
              return (
                movie.nom_producteurs &&
                movie.nom_producteurs.includes(producteur)
              ); // Filtre des films appartenant au genre
            })
            .slice(0, 25)}
          isLargeRow
          addToLists={addToLists}
        />
      ))}
      <ListsModal movie={movieBeingAdded} open={open} setOpen={setOpen} />
    </div>
  );
}
