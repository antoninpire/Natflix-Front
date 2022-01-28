import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { requests } from "../requests";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { constants } from "../constants";

const useStyles = makeStyles({
  root: {
    "&	.MuiFormControlLabel-label": {
      flex: 2,
      display: "flex",
      justifyContent: "center",
    },
  },
});

export function ListsModal({ movie, open, setOpen }) {
  const classes = useStyles();
  const [lists, setLists] = useState([]);
  const [checkedListsIds, setCheckedListsIds] = useState([]);
  const [prevCheckedListsIds, setPrevCheckedListsIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const arr = [];
      const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
      const user = JSON.parse(userStorage);
      let request = await axios.get(requests.fetchListsWithoutMovies + user.id);
      setLists(request.data);
      for (let list of request.data) {
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
      setLoading(false);
    }
    fetchData();
  }, [movie.id, open]);

  const handleClose = () => {
    setOpen(false);
    const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
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

  if (loading) return <Loader />;

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
  );
}
