import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { requests } from "../../requests";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@mui/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const useStyles = makeStyles({
  root: {
    "&	.MuiFormControlLabel-label": {
      flex: 2,
      display: "flex",
      justifyContent: "center",
    },
  },
});

const labels = {
  0.5: "0.5 / 5 (Horrible)",
  1: "1 / 5 (Naze)",
  1.5: "1.5 / 5 (Nul)",
  2: "2 / 5 (Nul+)",
  2.5: "2.5 / 5 (Ok)",
  3: "3 / 5 (Ok+)",
  3.5: "3.5 / 5 (Bon)",
  4: "4 / 5 (Très bon)",
  4.5: "4.5 / 5 (Excellent)",
  5: "5 / 5 (Incroyable)",
};

export function MoviePoster({ movie, hasWatched, note, lists }) {
  const classes = useStyles();

  const [hover, setHover] = useState(-1);
  const [currHasWatched, setCurrHasWatched] = useState(hasWatched);
  const [currNote, setCurrNote] = useState(note);
  const [open, setOpen] = useState(false);
  const [checkedListsIds, setCheckedListsIds] = useState([]);
  const [prevCheckedListsIds, setPrevCheckedListsIds] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let list of lists) {
      if (
        list.films_ids &&
        (list.films_ids.includes(`${movie.id},`) ||
          list.films_ids.includes(`,${movie.id}`) ||
          (!list.films_ids.includes(",") &&
            list.films_ids.includes(`${movie.id}`)))
      ) {
        arr.push(list.id);
      }
    }
    setCheckedListsIds(arr);
    setPrevCheckedListsIds(arr);
  }, [lists, movie.id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);

    // Si aucune modification, alors inutile d'envoyer une requête
    if (checkedListsIds.length === prevCheckedListsIds.length) {
      let isSame = true;
      for (let id_liste of checkedListsIds) {
        if (!prevCheckedListsIds.includes(id_liste)) {
          isSame = false;
          break;
        }
      }
      if (isSame) return;
    }

    axios
      .post(requests.updateMoviesList, {
        id_utilisateur: user.id,
        id_film: movie.id,
        lists_ids: checkedListsIds,
      })
      .then((res) => {
        toast.success("Changements de listes effectués!");
        setPrevCheckedListsIds(checkedListsIds);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la modification!");
      });
  };

  const handleAddView = () => {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);
    axios
      .post(requests.toggleView, {
        id_film: movie.id,
        id_utilisateur: user.id,
      })
      .then((res) => {
        toast.success("Modification effectuée!");
        setCurrHasWatched(!currHasWatched);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la modification!");
      });
  };

  const handleAddNote = (newNote) => {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);
    axios
      .post(requests.addNote, {
        id_film: movie.id,
        id_utilisateur: user.id,
        note: newNote,
      })
      .then((res) => {
        toast.success(`Vous avez noté ce film ${newNote}/5!`);
        setCurrNote(newNote);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la modification de la note!");
      });
  };

  const handleChangeList = (event, id_liste) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedListsIds([...checkedListsIds, id_liste]);
    } else {
      const checkedListsIdsCopy = [...checkedListsIds];
      checkedListsIdsCopy.splice(checkedListsIds.indexOf(id_liste), 1);
      setCheckedListsIds(checkedListsIdsCopy);
    }
  };

  return (
    <div className="movie-poster">
      <img
        key={movie.id}
        className="movie-poster-img"
        src={movie.url_affiche}
        alt={movie.titre}
      />
      <div className="movie-poster-actions">
        <div
          className="movie-poster-action movie-poster-action-watch"
          style={{ color: currHasWatched ? "#ff6d75" : "white" }}
          onClick={handleAddView}
        >
          <VisibilityIcon />
          Déjà vu
        </div>
        <div
          className="movie-poster-action movie-poster-action-add"
          onClick={handleOpen}
        >
          <AddIcon />
          Ajouter à une liste
        </div>
      </div>
      <div className="movie-poster-rating">
        <h3>Votre note:</h3>
        <div className="movie-poster-rating-stars ">
          <StyledRating
            name="customized-color"
            value={currNote}
            precision={0.5}
            icon={<FavoriteIcon fontSize="50px" />}
            emptyIcon={
              <FavoriteBorderIcon fontSize="50px" style={{ color: "white" }} />
            }
            size="large"
            onChange={(event, newValue) => {
              handleAddNote(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />

          <h3 style={{ color: "#ff6d75" }}>
            {labels[hover !== -1 ? hover : currNote]}
          </h3>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-content">
          {lists.map((list) => (
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: "white" }}
                  defaultChecked={checkedListsIds.includes(list.id)}
                  value={list.id}
                  onChange={(event) => handleChangeList(event, list.id)}
                />
              }
              label={list.nom}
              className="movie-poster-modal-label"
              classes={classes}
            />
          ))}
        </Box>
      </Modal>
    </div>
  );
}
