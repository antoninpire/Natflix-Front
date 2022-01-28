import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { requests } from "../../requests";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import { constants } from "../../constants";

export function Lists({
  lists,
  selectedListIndex,
  setSelectedListIndex,
  setDeleted,
  deleted,
}) {
  const handleDelete = (event, list) => {
    event.stopPropagation();
    if (
      window.confirm(`Voulez-vous vraiment supprimer la liste #${list.nom}?`)
    ) {
      axios
        .delete(requests.deleteList + list.id)
        .then((res) => {
          toast.success("Liste supprimée avec succès!");
          setDeleted(!deleted);
        })
        .catch((err) => {
          toast.error("Erreur lors de la suppression de la liste!");
        });
    }
  };

  const handleUpdate = (event, list) => {
    event.stopPropagation();
    const newName = window.prompt(
      "Quel nom voulez-vous attribuer à la liste",
      list.nom
    );
    if (newName !== list.nom) {
      axios
        .put(requests.updateList + list.id, {
          nom: newName,
        })
        .then((res) => {
          toast.success("Liste modifiée avec succès!");
          setDeleted(!deleted);
        })
        .catch((err) => {
          toast.error("Erreur lors de la modification de la liste!");
        });
    }
  };

  const handleAdd = () => {
    const nom = window.prompt("Comment voulez-vous appeler cette liste?");
    if (!nom) {
      toast.error("Veuillez renseigner un nom valide");
      return;
    }
    const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
    const user = JSON.parse(userStorage);
    axios
      .post(requests.addList, {
        id_utilisateur: user.id,
        nom,
      })
      .then((res) => {
        toast.success(`Liste #${nom} créée avec succès!`);
        setDeleted(!deleted);
      })
      .catch((err) => {
        toast.error("Erreur lors de la création de la liste!");
      });
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 200,
        bgcolor: "#363c41",
        color: "white",
        position: "fixed",
        left: 10,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {lists.map((list, index) => {
        return (
          <ListItemButton
            key={uuid()}
            sx={{
              paddingTop: "0",
              paddingBottom: "0",
            }}
            selected={selectedListIndex === index}
            onClick={() => setSelectedListIndex(index)}
          >
            <ListItemText
              primary={list.nom}
              secondary={
                list.films.length ? `${list.films.length} films` : "Aucun film"
              }
              secondaryTypographyProps={{ style: { color: "#bfbfbf" } }}
            />
            <IconButton
              edge="end"
              aria-label="Editer"
              sx={{
                color: "white",
                "&:hover": {
                  color: "#8c8c8c",
                },
              }}
              onClick={(event) => handleUpdate(event, list)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Supprimer"
              sx={{
                color: "white",
                "&:hover": {
                  color: "#8c8c8c",
                },
              }}
              onClick={(event) => handleDelete(event, list)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemButton>
        );
      })}
      <ListItemButton onClick={handleAdd}>
        <ListItemText primary="Créer une liste" />
        <IconButton
          edge="end"
          aria-label="Ajouter"
          sx={{
            color: "white",
          }}
        >
          <AddIcon />
        </IconButton>
      </ListItemButton>
    </List>
  );
}
