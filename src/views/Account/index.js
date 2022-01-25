import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";
import axios from "axios";
import { Loader } from "../../components/Loader";
import { requests } from "../../requests";
import Grid from "@mui/material/Grid";
import { Poster } from "../../components/Poster";
import { makeStyles } from "@mui/styles";
import { ListsModal } from "../../components/ListsModal";
import { Button, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  myGrid: {
    maxWidth: "95%",
  },
}));

export function Account() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [movieBeingAdded, setMovieBeingAdded] = useState({ id: 9999 });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userStorage = localStorage.getItem("user");
      const user = JSON.parse(userStorage);
      let request;
      request = await axios.get(requests.fetchWatchedMovies + "/" + user.id);
      setWatchedMovies(request.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const addToLists = (movie) => {
    setOpen(true);
    setMovieBeingAdded(movie);
  };

  const handleSeeMore = () => {
    const elem = document.getElementById("test");
    elem.style.maxHeight = elem.style.maxHeight == "260px" ? `100%` : "260px";
  };

  if (loading) return <Loader />;

  return (
    <div className="account-container">
      <Helmet>
        <title>Mon compte</title>
      </Helmet>
      <NavBar />
      <div className="account-content">
        <div style={{ display: "flex", color: "white" }}>
          <h2>Films vus</h2>

          <IconButton
            size="large"
            aria-label="Voir plus"
            onClick={handleSeeMore}
            style={{ color: "white" }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <div
          id="test"
          style={{
            maxHeight: "260px",
            overflow: "hidden",
            transition: "max-height 1s ease-in",
          }}
        >
          <Grid
            container
            justifyContent="center"
            spacing={1}
            className={classes.myGrid}
          >
            {watchedMovies.map((movie) => (
              <Grid key={movie.id} item>
                <Poster movie={movie} addToLists={addToLists} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <ListsModal movie={movieBeingAdded} open={open} setOpen={setOpen} />
    </div>
  );
}
