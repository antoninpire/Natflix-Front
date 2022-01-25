import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import AddIcon from "@mui/icons-material/Add";

export function Poster({ movie, isLarge, addToLists = () => {} }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/Movie/${movie.id}`);
  };

  const handleAddToLists = (event) => {
    event.stopPropagation();
    addToLists(movie);
  };

  if (isLarge && (!movie.url_affiche || movie.url_affiche.includes("null")))
    return <></>;
  if (!isLarge && (!movie.url_image || movie.url_image.includes("null")))
    return <></>;

  if (isLarge)
    return (
      <div
        className="poster-card poster-card-large"
        style={{
          backgroundImage: `url(${movie.url_affiche})`,
        }}
        onClick={handleClick}
      >
        <div>
          <AddIcon
            size="large"
            aria-label="Ajouter à une liste"
            sx={{
              color: "white",
              "&:hover": {
                color: "#8c8c8c",
              },
            }}
            onClick={(event) => handleAddToLists(event)}
          />
        </div>
        <div>
          <h4>{movie.titre}</h4>
          <p>{moment(movie.date_diffusion).format("Do MMMM YYYY")}</p>
        </div>
      </div>
    );

  return (
    <div onClick={handleClick} class="poster-card poster-card-small">
      <img
        key={movie.id}
        onClick={handleClick}
        className="row_poster"
        src={movie.url_image}
        alt={movie.titre}
      />
      <div className="poster-bottom">
        <div className="poster-bottom-infos">
          <h4>{movie.titre && movie.titre.replaceAll("\\", "")}</h4>
          {/* <p
          className="hyphenate"
          style={{
            fontSize: "12.5px",
            color: "lightgrey",
          }}
        >
          {movie.nom_genres.split(",").join(", ")}
        </p> */}
          <p style={{ fontSize: "14.5px", color: "#8c8c8c" }}>
            {moment(movie.date_diffusion).format("Do MMMM YYYY")}
          </p>
        </div>
        <div
          className="poster-bottom-icon"
          onClick={(event) => handleAddToLists(event)}
        >
          <AddIcon fontSize="large" aria-label="Ajouter à une liste" />
        </div>
      </div>
    </div>
  );
}
